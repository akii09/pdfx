import { Command } from 'commander';
import { add } from './commands/add.js';
import { diff } from './commands/diff.js';
import { init } from './commands/init.js';
import { list } from './commands/list.js';
import { templateAdd, templateList } from './commands/template.js';
import { themeInit, themeSwitch, themeValidate } from './commands/theme.js';

const program = new Command();

program.name('pdfx').description('CLI for PDFx components').version('0.1.0');

program.command('init').description('Initialize pdfx in your project').action(init);

program
  .command('add <components...>')
  .description('Add components to your project')
  .option('-f, --force', 'Overwrite existing files without prompting')
  .action((components: string[], options: { force?: boolean }) => add(components, options));

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

const templateCmd = program.command('template').description('Manage PDF templates');

templateCmd
  .command('add <templates...>')
  .description('Add a template to your project')
  .option('-f, --force', 'Overwrite existing files without prompting')
  .action((templates: string[], options: { force?: boolean }) => templateAdd(templates, options));

templateCmd
  .command('list')
  .description('List available templates from registry')
  .action(templateList);

program.parse();
