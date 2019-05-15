const merge = require('webpack-merge');
const common = require('./webpack.common');

/**
 * @type { import('webpack').Configuration }
 */
const config = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  }
});

module.exports = config;