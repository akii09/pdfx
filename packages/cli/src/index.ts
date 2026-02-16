import { Command } from 'commander';
import { add } from './commands/add.js';
import { init } from './commands/init.js';

const program = new Command();

program.name('pdfx').description('CLI for PDFX components').version('0.1.0');

program.command('init').description('Initialize pdfx in your project').action(init);

program.command('add <components...>').description('Add components to your project').action(add);

program.parse();