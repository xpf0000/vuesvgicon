const path = require('path')
const webpack = require('webpack')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      libraryExport: 'default'
    },
    plugins: []
  },
  chainWebpack: config => {
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    config.module
      .rule('svg-inline-loader')
      .test(/\.svg$/)
      .use('svg-inline-loader')
      .loader('svg-inline-loader')
      .options({
        removeTags: true,
        removingTags: ['p-id', 'id', 'class', 'title', 'desc', 'defs', 'style'],
        removingTagAttrs: ['fill', 't', 'version', 'p-id', 'id', 'class', 'title', 'desc', 'defs', 'style', 'width', 'height', 'xmlns', 'xmlns:xlink']
      })
  }
}
