const { defineConfig } = require('@vue/cli-service');
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath: '/wp-content/plugins/mi-plugin/mi_vendor_dashboard/dist/',
  outputDir: path.resolve(__dirname, "../dist"),

  pages: {
    index: {
      // entry for the page
      entry: 'src/main.ts',
      title: 'Dashborad Venditore',
    },
  },

})
