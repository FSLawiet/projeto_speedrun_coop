import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'cli',
  run: async (toolbox) => {
    const { print, http } = toolbox
    const api = http.create({
      baseURL: 'http://localhost:3000',
      headers: { Accept: 'application/json' },
    })

    const { status, data } = await api.get('/users')

    const parseData = (data, status): any[] => {
      const tableData = []
      if (status === 200 && data && !data.error)
        for (let user of data) {
          const p = []
          p.push(`${print.checkmark} ${user.id.toString()}`)
          p.push(user.username)
          p.push(user.senha)
          tableData.push(p)
        }
      else if (status === 404) {
        print.error('Erro na conexão com o servidor!')
        process.exit(0)
      }
      return tableData
    }

    const printData = parseData(data, status)

    print.info('Welcome to your CLI')

    if (printData.length === 0) print.warning('Nenhum usuário cadastrado!')
    else {
      print.table([['ID', 'User Name', 'Encrypted Password'], ...printData], {
        format: 'lean',
        style: { 'padding-left': 0, 'padding-right': 8 },
      })
    }
  },
}

module.exports = command
