const { defineConfig } = require('@vue/cli-service');

// Vant 按需引入配置
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: { // webpack 配置
    resolve: {
      alias: { // 为目录设置别名
        '@assets': '@/assets', // @assets = src/assets
        '@components': '@/components', // @components = src/components
        '@network': '@/network', // @network = src/network
        '@utils': '@/utils', // @utils = src/utils
        '@views': '@/views', // @views = src/views
      }
    },
    // Vant 按需引入配置
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
});


