#!/usr/bin/env node
const program = require('commander');
import banner from './view/banner';

program
  .version('0.0.1')
  .description("CLI app to download mangas from japsca to specific format")
  .option('-d, --download', 'Download a manga')
  .option('-c, --chapter <first_chapter> <last_chapter>', 'Download one or more chapters')
  .option('-f, --format <pdf, cbz, raw>', 'Download in specific format')
  .option('-c, --convert <pdf, cbz, raw> <path> <output>', 'Convert a file to another format')
  .option('-s, --search <manga_name>', 'Search a manga')
  .option('-u, --update-url <manga_url>', 'Update manga url')
  .parse(process.argv);

const options = program.opts();

banner({paddingLeft: 5, paddingTop: 1, version: program.version()});

switch (true) {
  case options.download:
    console.log('Download a manga');
    break;
  case options.convert:
    console.log('Convert a manga');
    break;
  case options.search:
    console.log('Search a manga');
    break;
  case options.updateUrl:
    console.log('Update the url of website');
    break;
  default:
    console.log("MENU");
    break;
}