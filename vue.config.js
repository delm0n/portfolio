const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "./docs"),
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "~@/assets/style/default/_variables.scss";
        @import "~@/assets/style/default/_mixins.scss";
      `,
      },
    },
  },
});
