const { getPrismaClientDmmf } = require('nexus-prisma/dist-cjs/helpers/prisma')
const ModelsGenerator = require('nexus-prisma/dist-cjs/generator/models/index')
const { Runtime } = require('nexus-prisma/dist-cjs/generator/runtime/settingsSingleton')

const gentimeSettings = {
  "output": {
    "directory": "C:\\Users\\onlyd\\Documents\\GitHub\\timber\\prisma\\generated\\nexus-prisma",
    "name": "index"
  },
  "projectIdIntToGraphQL": "Int",
  "jsdocPropagationDefault": "guide",
  "docPropagation": {
    "GraphQLDocs": true,
    "JSDoc": true
  },
  "prismaClientImportId": "C:\\Users\\onlyd\\Documents\\GitHub\\timber\\prisma\\generated\\prisma-client-js"
}

const dmmf = getPrismaClientDmmf({
  // JSON stringify the values to ensure proper escaping
  // Details: https://github.com/prisma/nexus-prisma/issues/143
  // TODO test that fails without this code
  require: () => require("C:\\Users\\onlyd\\Documents\\GitHub\\timber\\prisma\\generated\\prisma-client-js"),
  importId: gentimeSettings.prismaClientImportId,
  importIdResolved: require.resolve("C:\\Users\\onlyd\\Documents\\GitHub\\timber\\prisma\\generated\\prisma-client-js")
})

const models = ModelsGenerator.JS.createNexusTypeDefConfigurations(dmmf, {
  runtime: Runtime.settings,
  gentime: gentimeSettings,
})

module.exports = {
  $settings: Runtime.settings.change,
  ...models,
}