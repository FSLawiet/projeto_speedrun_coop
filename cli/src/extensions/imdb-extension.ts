import { GluegunToolbox } from 'gluegun'
import * as imdb from 'imdb-api'

module.exports = (toolbox: GluegunToolbox) => {
  const { prompt } = toolbox

  const getMovie = async (name: string): Promise<imdb.Movie | null> => {
    const result = await prompt.ask({
      type: 'input',
      name: 'key',
      message: 'API key>',
    })

    if (result.key)
      return imdb.get({ name }, { apiKey: result.key, timeout: 30000 })
  }

  toolbox.imdb = { getMovie }
}
