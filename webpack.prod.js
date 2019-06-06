const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * @type { import('webpack').Configuration }
 */
const config = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ]
});

module.exports = config;