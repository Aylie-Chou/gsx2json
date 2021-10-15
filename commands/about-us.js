#!/usr/bin/env node
const commander = require('commander')
const configRegulator = require('../actions/about-us/config-regulator')
const converter = require('../actions/converter')
const uploader = require('../actions/about-us/uploader')
const program = new commander.Command()

// For main site about-us page
program
  .description('update configs for about-us page')
  .option('--id <spreadsheet>', 'google spreadsheet id', '16CVkhaSw5sxwjlSt1c0nLzxG7qzEmeO2gCymVsSY6PE')
  .option('--sheetName <name>', 'sheet name', 'test')
  .option('--section <index>', 'section index number', '5')
  .option('--branch <branch>', 'git branch (one of "master", "staging", "release")', 'master')
  .action(async (options) => {
    const rawConfig = await converter(options)
    const config = configRegulator(rawConfig, options)
    await uploader(config, options)
  })

program.on('--help', () => {
  console.log('')
  console.log('Example call:')
  console.log('  $ about-us --help')
})

program.parse(process.argv)
