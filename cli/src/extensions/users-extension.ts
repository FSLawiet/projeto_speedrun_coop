import { GluegunToolbox } from 'gluegun'
import { User } from '../types'

module.exports = (toolbox: GluegunToolbox) => {
  const { prompt, http, print } = toolbox

  const getUser = async (): Promise<User | {}> => {
    const input = await prompt.ask({
      type: 'input',
      name: 'id',
      message: 'Id do Usuário>',
    })

    if (input.id) {
      const api = http.create({
        baseURL: 'http://localhost:3000',
        headers: { Accept: 'application/json' },
      })
      const { status, data } = await api.get(`/users/${input.id}`)

      if (status !== 200) print.warning('Erro na conexão com o servidor!')
      else return data
    }
  }

  toolbox.user = { getUser }
}
