import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'report',
  alias: ['r'],
  description: 'Generates a report about an object in markdown',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print,
      prompt,
      user,
    } = toolbox

    let obj = parameters.first

    if (!obj) {
      const input = await prompt.ask({
        type: 'input',
        name: 'name',
        message: 'What object?',
      })
      if (input && input.name) obj = input.name
    }

    if (!obj) {
      print.error(`No object specified!`)
      return
    } else {
      switch (obj) {
        case 'users':
          const data = await user.getUser()
          if (!data) {
            print.error('Erro na requisição de usuário')
            process.exit(0)
          } else {
            await generate({
              template: 'report.ts.ejs',
              target: `models/${data.id}-${data.username}-model.html`,
              props: {
                id: data.id,
                username: data.username,
                senha: data.senha,
              },
            })
            print.success('Relatório gerado com sucesso!')
            process.exit(0)
          }
        default:
          print.warning('Objeto não suportado!')
      }
    }
  },
}
