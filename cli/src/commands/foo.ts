import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'foo',
  alias: 'f',
  run: async (toolbox: GluegunToolbox) => {
    const { system, print, filesystem, strings } = toolbox

    const spinner = print.spin('Loading...')
    spinner.color = 'black'

    const awesome = strings.trim(await system.run('whoami'))
    const moreAwesome = strings.kebabCase(`${awesome} and a keyboard`)
    const contents = `🚨 ☭ Warning! ${moreAwesome} comming thru! ☭ 🚨`
    const home = process.env['HOME']
    filesystem.write(`${home}/realtalk.json`, { contents })
    spinner.stopAndPersist({ symbol: '🏴', text: 'Ahoy!' })
    print.info(`${print.checkmark} Citius`)
    print.highlight(`${print.checkmark} What?`)
    print.warning(`${print.checkmark} Altius`)
    print.success(`${print.checkmark} Fortus`)
    print.error(
      `${print.checkmark} 🚨 ☭ 'Let us be free from the lies of capitalism! ☭ 🚨`
    )
  },
}
