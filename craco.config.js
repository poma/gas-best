const CopyPlugin = require("copy-webpack-plugin");
const CracoAlias = require("craco-alias");

const EXT = process.env.REACT_APP_EXTENSION;

module.exports = {
  webpack: {
    configure: (webpackConfig, { paths }) => {
      if (EXT) {
        return {
          ...webpackConfig,
          entry: {
            main: [paths.appIndexJs],
            background: `./src/extension/${EXT}/background.ts`,
          },
          output: {
            ...webpackConfig.output,
            filename: "[name].js",
          },
          optimization: {
            ...webpackConfig.optimization,
            runtimeChunk: false,
          },
        };
      }

      return webpackConfig;
    },
    plugins: {
      add: !!EXT
        ? [
            new CopyPlugin({
              patterns: [
                { from: `src/extension/${EXT}/manifest.json`, to: "" },
              ],
            }),
          ]
        : [],
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
