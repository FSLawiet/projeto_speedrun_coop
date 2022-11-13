import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { success },
    } = toolbox

    const name = parameters.first

    await generate({
      template: 'model.ts.ejs',
      target: `models/${name}-model.md`,
      props: { name },
    })

    success(`Generated file at models/${name}-model.ts`)
  },
}
