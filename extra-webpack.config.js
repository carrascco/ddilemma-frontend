const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Object.keys(process.env).reduce((env, key) => {
        env[key] = JSON.stringify(process.env[key]);
        return env;
      }, {})
    })
  ]
};
