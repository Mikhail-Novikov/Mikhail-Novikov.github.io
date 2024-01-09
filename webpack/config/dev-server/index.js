const paths = require('../paths');

module.exports = {
  devServer: {
    port: 3000,
    allowedHosts: [],
    open: true,
    overlay: true,
    contentBase: [paths.appDocs],
    historyApiFallback: true,
    hot: true,
  },
};
