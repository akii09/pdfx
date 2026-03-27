import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { getAddCommand, getAddCommandSchema } from './tools/add-command.js';
import { getAuditChecklist } from './tools/audit.js';
import { getBlock, getBlockSchema, listBlocks, listBlocksSchema } from './tools/blocks.js';
import {
  getComponent,
  getComponentSchema,
  listComponents,
  listComponentsSchema,
} from './tools/components.js';
import { getInstallation, getInstallationSchema } from './tools/installation.js';
import { searchRegistry, searchRegistrySchema } from './tools/search.js';
import { getTheme, getThemeSchema } from './tools/theme.js';
import { errorResponse } from './utils.js';

export const server = new Server(
  { name: 'pdfx', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// ─── Tool definitions ────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_components',
      description:
        'List all available PDFx PDF components with names and descriptions. Call this first to discover what components exist before adding any.',
      inputSchema: zodToJsonSchema(listComponentsSchema) as {
        type: 'object';
        [k: string]: unknown;
      },
    },
    {
      name: 'get_component',
      description:
        'Get the full source code, files, and dependencies for a specific PDFx component. Use this to understand the API and props before using it in generated code.',
      inputSchema: zodToJsonSchema(getComponentSchema) as { type: 'object'; [k: string]: unknown },
    },
    {
      name: 'list_blocks',
      description:
        'List all PDFx pre-built document blocks (complete invoice and report layouts ready to customize).',
      inputSchema: zodToJsonSchema(listBlocksSchema) as { type: 'object'; [k: string]: unknown },
    },
    {
      name: 'get_block',
      description:
        'Get the full source code for a PDFx document block. Returns the complete layout code ready to customize for your use case.',
      inputSchema: zodToJsonSchema(getBlockSchema) as { type: 'object'; [k: string]: unknown },
    },
    {
      name: 'search_registry',
      description:
        'Search PDFx components and blocks by name or description. Use this when you know what you need but not the exact item name.',
      inputSchema: zodToJsonSchema(searchRegistrySchema) as {
        type: 'object';
        [k: string]: unknown;
      },
    },
    {
      name: 'get_theme',
      description:
        'Get the full design token values for a PDFx theme preset (professional, modern, or minimal). Use this to understand colors, typography, and spacing before customizing documents.',
      inputSchema: zodToJsonSchema(getThemeSchema) as { type: 'object'; [k: string]: unknown },
    },
    {
      name: 'get_installation',
      description:
        'Get step-by-step PDFx setup instructions for a specific framework and package manager. Use this when setting up PDFx in a new project.',
      inputSchema: zodToJsonSchema(getInstallationSchema) as {
        type: 'object';
        [k: string]: unknown;
      },
    },
    {
      name: 'get_add_command',
      description:
        'Get the exact CLI command string to add specific PDFx components or blocks to a project.',
      inputSchema: zodToJsonSchema(getAddCommandSchema) as { type: 'object'; [k: string]: unknown },
    },
    {
      name: 'get_audit_checklist',
      description:
        'Get a post-generation checklist to verify PDFx is set up correctly. Call this after adding components or generating PDF document code.',
      inputSchema: zodToJsonSchema(z.object({})) as { type: 'object'; [k: string]: unknown },
    },
  ],
}));

// ─── Tool handlers ───────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const args = request.params.arguments ?? {};

  try {
    switch (request.params.name) {
      case 'list_components':
        return await listComponents();

      case 'get_component':
        return await getComponent(getComponentSchema.parse(args));

      case 'list_blocks':
        return await listBlocks();

      case 'get_block':
        return await getBlock(getBlockSchema.parse(args));

      case 'search_registry':
        return await searchRegistry(searchRegistrySchema.parse(args));

      case 'get_theme':
        return await getTheme(getThemeSchema.parse(args));

      case 'get_installation':
        return await getInstallation(getInstallationSchema.parse(args));

      case 'get_add_command':
        return await getAddCommand(getAddCommandSchema.parse(args));

      case 'get_audit_checklist':
        return await getAuditChecklist();

      default:
        return errorResponse(new Error(`Unknown tool: ${request.params.name}`));
    }
  } catch (error) {
    return errorResponse(error);
  }
});
