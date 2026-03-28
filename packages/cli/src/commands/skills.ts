import { existsSync, readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { Command } from 'commander';
import prompts from 'prompts';
import { PDFX_SKILLS_CONTENT } from '../skills-content.js';
import { displayPreFlightResults, runPreFlightChecks } from '../utils/pre-flight.js';

interface SkillsPlatform {
  /** Matches --platform flag and MCP client names where applicable */
  name: string;
  label: string;
  /** Target file path (relative to project root) */
  file: string;
  /** Short description shown in the interactive picker */
  hint: string;
  /** Printed after a successful write */
  verifyStep: string;
  /**
   * Optional YAML frontmatter to prepend before the skills content.
   * Include trailing newlines so the content starts on a new line.
   * Example: "---\nalwaysApply: true\n---\n\n"
   */
  frontmatter?: string;
}

/**
 * One entry per AI editor, aligned with CLIENTS in mcp.ts.
 * Update both lists when a new editor is added.
 */
const PLATFORMS: SkillsPlatform[] = [
  {
    name: 'claude',
    label: 'Claude Code',
    file: 'CLAUDE.md',
    hint: 'Project-level CLAUDE.md — read automatically by Claude Code',
    verifyStep: 'Claude Code picks up CLAUDE.md automatically on next session.',
  },
  {
    // .cursor/rules/*.mdc with alwaysApply: true — Cursor's current rules format (not .cursorrules).
    name: 'cursor',
    label: 'Cursor',
    file: '.cursor/rules/pdfx.mdc',
    hint: '.cursor/rules/pdfx.mdc — Cursor rules file with alwaysApply frontmatter',
    verifyStep: 'Cursor reads .cursor/rules/*.mdc automatically. Restart Cursor to be sure.',
    frontmatter:
      '---\ndescription: PDFx PDF component library AI context\nglobs: \nalwaysApply: true\n---\n\n',
  },
  {
    name: 'vscode',
    label: 'VS Code (Copilot)',
    file: '.github/copilot-instructions.md',
    hint: '.github/copilot-instructions.md — read by GitHub Copilot Chat',
    verifyStep:
      'GitHub Copilot reads copilot-instructions.md from .github/. Commit the file so teammates get it too.',
  },
  {
    name: 'windsurf',
    label: 'Windsurf',
    file: '.windsurfrules',
    hint: '.windsurfrules — applied to all Cascade AI interactions',
    verifyStep: 'Windsurf applies .windsurfrules automatically.',
  },
  {
    name: 'qoder',
    label: 'Qoder',
    file: '.qoder/rules.md',
    hint: '.qoder/rules.md — Qoder project-level AI context',
    verifyStep: 'Restart Qoder and check that the AI context is loaded from .qoder/rules.md.',
  },
  {
    name: 'opencode',
    label: 'opencode',
    file: 'AGENTS.md',
    hint: 'AGENTS.md — opencode project context file',
    verifyStep: 'opencode reads AGENTS.md from the project root. Start a new session to verify.',
  },
  {
    name: 'antigravity',
    label: 'Antigravity',
    file: '.antigravity/context.md',
    hint: '.antigravity/context.md — Antigravity project context',
    verifyStep: 'Verify the context path against your Antigravity version. Restart to activate.',
  },
  {
    name: 'other',
    label: 'Generic (any AI tool)',
    file: 'pdfx-context.md',
    hint: "pdfx-context.md — reference this from your editor's rules file",
    verifyStep:
      "Reference pdfx-context.md from your editor's rules file (e.g. .cursorrules, CLAUDE.md).",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PDFX_MARKER = '# PDFx — AI Context Guide';

function fileHasPdfxContent(filePath: string): boolean {
  try {
    return readFileSync(filePath, 'utf-8').includes(PDFX_MARKER);
  } catch {
    return false;
  }
}

async function skillsInit(opts: {
  platform?: string;
  yes?: boolean;
  append?: boolean;
}): Promise<void> {
  const preFlightResult = runPreFlightChecks();
  displayPreFlightResults(preFlightResult);

  if (!preFlightResult.canProceed) {
    console.error(
      chalk.red('\n  Cannot proceed due to blocking issues. Please fix them and try again.\n')
    );
    process.exit(1);
  }

  let platformName = opts.platform;

  if (!platformName) {
    const response = await prompts({
      type: 'select',
      name: 'platform',
      message: 'Which AI editor are you targeting?',
      choices: PLATFORMS.map((p) => ({
        title: p.label,
        value: p.name,
        description: p.hint,
      })),
    });

    if (!response.platform) {
      // User pressed Ctrl+C
      process.exit(0);
    }

    platformName = response.platform as string;
  }

  const platform = PLATFORMS.find((p) => p.name === platformName);
  if (!platform) {
    process.stderr.write(chalk.red(`✖ Unknown platform: "${platformName}"\n`));
    process.stderr.write(
      chalk.dim(`  Valid options: ${PLATFORMS.map((p) => p.name).join(', ')}\n`)
    );
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), platform.file);
  const fileDir = path.dirname(filePath);
  const relativeFile = platform.file;
  const alreadyExists = existsSync(filePath);
  const hasPdfxContent = alreadyExists && fileHasPdfxContent(filePath);

  let shouldAppend = opts.append ?? false;

  if (alreadyExists) {
    if (shouldAppend || opts.yes) {
      // --append or --yes: no prompt needed
    } else if (hasPdfxContent) {
      // File already has PDFx content — ask to update or skip
      const { action } = await prompts({
        type: 'select',
        name: 'action',
        message: `${relativeFile} already contains PDFx context. What would you like to do?`,
        choices: [
          { title: 'Overwrite (replace PDFx section with latest content)', value: 'overwrite' },
          { title: 'Skip', value: 'skip' },
        ],
      });

      if (!action || action === 'skip') {
        process.stdout.write(chalk.dim('\nSkipped — existing file kept.\n\n'));
        return;
      }
    } else {
      // File exists but has no PDFx content — ask to append, overwrite, or skip
      const { action } = await prompts({
        type: 'select',
        name: 'action',
        message: `${relativeFile} already exists. What would you like to do?`,
        choices: [
          {
            title: 'Append (add PDFx context at the end, keep existing content)',
            value: 'append',
          },
          { title: 'Overwrite (replace entire file with PDFx context)', value: 'overwrite' },
          { title: 'Skip', value: 'skip' },
        ],
      });

      if (!action || action === 'skip') {
        process.stdout.write(chalk.dim('\nSkipped — existing file kept.\n\n'));
        return;
      }

      if (action === 'append') {
        shouldAppend = true;
      }
    }
  }

  if (!existsSync(fileDir)) {
    await mkdir(fileDir, { recursive: true });
  }

  const appendContent = `\n\n---\n\n${PDFX_SKILLS_CONTENT}`;
  const content = shouldAppend ? appendContent : PDFX_SKILLS_CONTENT;

  if (shouldAppend && alreadyExists) {
    const existing = readFileSync(filePath, 'utf-8');
    await writeFile(filePath, `${existing.trimEnd()}${content}\n`, 'utf-8');
  } else {
    await writeFile(filePath, `${content}\n`, 'utf-8');
  }

  const action = shouldAppend && alreadyExists ? 'Appended PDFx context to' : 'Wrote';
  process.stdout.write(`\n${chalk.green('✓')} ${action} ${chalk.cyan(relativeFile)}\n`);
  process.stdout.write(`\n${chalk.dim(platform.verifyStep)}\n\n`);

  if (platform.name === 'claude') {
    process.stdout.write(
      chalk.dim(
        'Tip: if you also use the MCP server, CLAUDE.md + MCP gives the AI\n' +
          'the best possible PDFx knowledge — static props reference + live registry.\n\n'
      )
    );
  }
}

export const skillsCommand = new Command()
  .name('skills')
  .description('Manage the PDFx AI context (skills) file for your editor');

skillsCommand
  .command('init')
  .description("Write the PDFx skills file to your AI editor's context file")
  .option(
    '-p, --platform <name>',
    `Target AI editor. One of: ${PLATFORMS.map((p) => p.name).join(', ')}`
  )
  .option('-y, --yes', 'Overwrite existing file without prompting')
  .option('-a, --append', 'Append PDFx context to an existing file instead of overwriting')
  .action(skillsInit);

skillsCommand
  .command('list')
  .description('List all supported AI editor platforms')
  .action(() => {
    process.stdout.write('\n');
    process.stdout.write(chalk.bold('  Supported platforms\n\n'));
    for (const p of PLATFORMS) {
      process.stdout.write(`  ${chalk.cyan(p.name.padEnd(12))} ${chalk.dim('→')} ${p.file}\n`);
    }
    process.stdout.write('\n');
    process.stdout.write(
      chalk.dim('  Usage: npx pdfx-cli@latest skills init --platform <name>\n\n')
    );
  });
