import commander from 'commander';

export default () => {
  const program = commander;
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference');
  program.parse(process.argv);
};
