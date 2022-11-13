import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'search',
  alias: ['s'],
  description: 'Searches for and displays information about a movie',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, prompt, imdb } = toolbox

    let name = parameters.first

    if (!name) {
      const result = await prompt.ask({
        type: 'input',
        name: 'name',
        message: 'What movie?',
      })
      if (result && result.name) name = result.name
    }

    if (!name) {
      print.error(`No movie name specified!`)
      return
    }

    const movie = await imdb.getMovie(name)
    if (!movie) {
      print.error(`Couldn't find that movie, sorry!`)
    }

    print.debug(movie)
  },
}
