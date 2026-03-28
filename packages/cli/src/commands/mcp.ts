import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import chalk from 'chalk';
import { Command } from 'commander';
import prompts from 'prompts';
import { server } from '../mcp/index.js';
import { displayPreFlightResults, runPreFlightChecks } from '../utils/pre-flight.js';

const PDFX_CLI_PACKAGE = 'pdfx-cli';
const PDFX_MCP_VERSION = 'latest';

interface McpClient {
  name: string;
  label: string;
  configPath: string;
  /** The config fragment to merge into the client's config file. */
  config: Record<string, unknown>;
}

// VS Code uses "servers" + "type":"stdio". opencode uses "mcp" + "type":"local" + unified command array.
// Antigravity uses the standard mcpServers convention. All others use the Claude Desktop mcpServers format.
const CLIENTS: McpClient[] = [
  {
    name: 'claude',
    label: 'Claude Code',
    configPath: '.mcp.json',
    config: {
      mcpServers: {
        pdfx: {
          command: 'npx',
          args: ['-y', `${PDFX_CLI_PACKAGE}@${PDFX_MCP_VERSION}`, 'mcp'],
        },
      },
    },
  },
  {
    name: 'cursor',
    label: 'Cursor',
    configPath: '.cursor/mcp.json',
    config: {
      mcpServers: {
        pdfx: {
          command: 'npx',
          args: ['-y', `${PDFX_CLI_PACKAGE}@${PDFX_MCP_VERSION}`, 'mcp'],
        },
      },
    },
  },
  {
    name: 'vscode',
    label: 'VS Code',
    configPath: '.vscode/mcp.json',
    config: {
      servers: {
        pdfx: {
          type: 'stdio',
          command: 'npx',
          args: ['-y', `${PDFX_CLI_PACKAGE}@${PDFX_MCP_VERSION}`, 'mcp'],
        },
      },
    },
  },
  {
    name: 'windsurf',
    label: 'Windsurf',
    configPath: 'mcp_config.json',
    config: {
      mcpServers: {
        pdfx: {
          command: 'npx',
          args: ['-y', `${PDFX_CLI_PACKAGE}@${PDFX_MCP_VERSION}`, 'mcp'],
        },
      },
    },
  },
  {
    name: 'qoder',
    label: 'Qoder',
    configPath: '.qoder/mcp.json',
    config: {
      mcpServers: {
        pdfx: {
          command: 'npx',
          args: ['-y', `${PDFX_CLI_PACKAGE}@${PDFX_MCP_VERSION}`, 'mcp'],
        },
      },
    },
  },
  {
    name: 'opencode',
    label: 'opencode',
    configPath: 'opencode.json',
    config: {
      $schema: 'https://opencode.ai/config.json',
      mcp: {
        pdfx: {
          type: 'local',
          command: ['npx', '-y', `${PDFX_CLI_PACKAGE}@${PDFX_MCP_VERSION}`, 'mcp'],
        },
      },
    },
  },
  {
    name: 'antigravity',
    label: 'Antigravity',
    configPath: '.antigravity/mcp.json',
    config: {
      mcpServers: {
        pdfx: {
          command: 'npx',
          args: ['-y', `${PDFX_CLI_PACKAGE}@${PDFX_MCP_VERSION}`, 'mcp'],
        },
      },
    },
  },
  {
    name: 'other',
    label: 'Generic (any MCP client)',
    configPath: 'pdfx-mcp.json',
    config: {
      mcpServers: {
        pdfx: {
          command: 'npx',
          args: ['-y', `${PDFX_CLI_PACKAGE}@${PDFX_MCP_VERSION}`, 'mcp'],
        },
      },
    },
  },
];

/** Recursively merge two plain objects (arrays are replaced, not concatenated). */
function mergeDeep(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...target };
  for (const [key, value] of Object.entries(source)) {
    const existing = result[key];
    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      existing !== null &&
      typeof existing === 'object' &&
      !Array.isArray(existing)
    ) {
      result[key] = mergeDeep(
        existing as Record<string, unknown>,
        value as Record<string, unknown>
      );
    } else {
      result[key] = value;
    }
  }
  return result;
}

async function readJsonConfig(filePath: string): Promise<Record<string, unknown>> {
  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function isPdfxAlreadyConfigured(config: Record<string, unknown>): boolean {
  const withMcpServers = config as { mcpServers?: { pdfx?: unknown } };
  const withServers = config as { servers?: { pdfx?: unknown } };
  const withMcp = config as { mcp?: { pdfx?: unknown } };
  return (
    withMcpServers.mcpServers?.pdfx !== undefined ||
    withServers.servers?.pdfx !== undefined ||
    withMcp.mcp?.pdfx !== undefined
  );
}

async function initMcpConfig(opts: { client?: string }): Promise<void> {
  const preFlightResult = runPreFlightChecks();
  displayPreFlightResults(preFlightResult);

  if (!preFlightResult.canProceed) {
    console.error(
      chalk.red('\n  Cannot proceed due to blocking issues. Please fix them and try again.\n')
    );
    process.exit(1);
  }

  let clientName = opts.client;

  if (!clientName) {
    const response = await prompts({
      type: 'select',
      name: 'client',
      message: 'Which AI editor are you configuring?',
      choices: CLIENTS.map((c) => ({ title: c.label, value: c.name })),
    });

    if (!response.client) {
      process.exit(0);
    }

    clientName = response.client as string;
  }

  const client = CLIENTS.find((c) => c.name === clientName);
  if (!client) {
    process.stderr.write(`Unknown client: "${clientName}"\n`);
    process.stderr.write(`Valid options: ${CLIENTS.map((c) => c.name).join(', ')}\n`);
    process.exit(1);
  }

  const configPath = path.resolve(process.cwd(), client.configPath);
  const configDir = path.dirname(configPath);
  const existing = await readJsonConfig(configPath);

  // Ask before overwriting an existing pdfx entry
  if (isPdfxAlreadyConfigured(existing)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `PDFx MCP is already configured in ${client.configPath}. Overwrite?`,
      initial: false,
    });

    if (!overwrite) {
      process.stdout.write('\nSkipped — existing configuration kept.\n');
      return;
    }
  }

  // Create parent directory if needed
  if (!existsSync(configDir)) {
    await mkdir(configDir, { recursive: true });
  }

  const merged = mergeDeep(existing, client.config);
  await writeFile(configPath, `${JSON.stringify(merged, null, 2)}\n`, 'utf-8');

  process.stdout.write(`\n✓ Wrote MCP configuration to ${client.configPath}\n`);
  process.stdout.write(`\nRestart ${client.label} to activate the PDFx MCP server.\n`);

  if (client.name === 'claude') {
    process.stdout.write('\nAlternatively, run:\n  claude mcp add pdfx -- npx -y pdfx-cli mcp\n');
  }

  if (client.name === 'opencode') {
    process.stdout.write('\nVerify: run `opencode mcp list` — pdfx should appear.\n');
    process.stdout.write(
      'Tip: move opencode.json to ~/.config/opencode/opencode.json for global access.\n'
    );
  }

  if (client.name === 'antigravity') {
    process.stdout.write('\nVerify: open Antigravity → MCP panel → pdfx should appear.\n');
  }

  if (client.name === 'other') {
    process.stdout.write('\nThis file contains the PDFx MCP server configuration.\n');
    process.stdout.write(
      "Copy the pdfx entry into your editor's native MCP config file, or reference this file directly.\n"
    );
  }

  process.stdout.write('\n');
}

// ─── Command definition ──────────────────────────────────────────────────────

export const mcpCommand = new Command()
  .name('mcp')
  .description('Start the PDFx MCP server for AI editor integration')
  .action(async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  });

mcpCommand
  .command('init')
  .description('Add PDFx MCP server config to your AI editor')
  .option(
    '--client <name>',
    `AI editor to configure. One of: ${CLIENTS.map((c) => c.name).join(', ')}`
  )
  .action(initMcpConfig);
