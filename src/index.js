import program from 'commander';

// main
export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference');
  program.parse(process.argv);
};
