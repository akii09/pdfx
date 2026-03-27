import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { Command } from 'commander';
import { add } from './commands/add.js';
import { blockAdd, blockList } from './commands/block.js';
import { diff } from './commands/diff.js';
import { init } from './commands/init.js';
import { list } from './commands/list.js';
import { mcpCommand } from './commands/mcp.js';
import { skillsCommand } from './commands/skills.js';
import { themeInit, themeSwitch, themeValidate } from './commands/theme.js';

function getVersion(): string {
  try {
    const pkgPath = join(dirname(fileURLToPath(import.meta.url)), '../package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { version?: string };
    return pkg.version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

const program = new Command();

program.name('pdfx').description('CLI for PDFx components').version(getVersion());

program.configureOutput({
  writeErr: (str) => {
    const message = str.replace(/^error:\s*/i, '').trimEnd();
    process.stderr.write(chalk.red(`✖ ${message}\n`));
  },
});

program
  .command('init')
  .description('Initialize pdfx in your project')
  .option('-y, --yes', 'Accept all defaults without prompting (non-interactive / CI mode)')
  .action((options: { yes?: boolean }) => init(options));

program
  .command('add <components...>')
  .description('Add components to your project')
  .option('-f, --force', 'Overwrite existing files without prompting')
  .option('-r, --registry <url>', 'Override registry URL')
  .option('--install-deps', 'Install missing component dependencies without prompting')
  .option('--strict-deps', 'Fail when any runtime or dev dependency is missing')
  .action(
    (
      components: string[],
      options: {
        force?: boolean;
        registry?: string;
        installDeps?: boolean;
        strictDeps?: boolean;
      }
    ) => add(components, options)
  );

program.command('list').description('List available components from registry').action(list);

program
  .command('diff <components...>')
  .description('Compare local components with registry versions')
  .action(diff);

const themeCmd = program.command('theme').description('Manage PDF themes');

themeCmd.command('init').description('Initialize or replace the theme file').action(themeInit);

themeCmd
  .command('switch <preset>')
  .description('Switch to a preset theme (professional, modern, minimal)')
  .action(themeSwitch);

themeCmd.command('validate').description('Validate your theme file').action(themeValidate);

program.addCommand(mcpCommand);
program.addCommand(skillsCommand);

const blockCmd = program.command('block').description('Manage PDF blocks (copy-paste designs)');

blockCmd
  .command('add <blocks...>')
  .description('Add blocks to your project')
  .option('-f, --force', 'Overwrite existing files without prompting')
  .action((blocks: string[], options: { force?: boolean }) => blockAdd(blocks, options));

blockCmd.command('list').description('List available blocks from registry').action(blockList);

try {
  await program.parseAsync();
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(chalk.red(`✖ ${message}\n`));
  process.exitCode = 1;
}
