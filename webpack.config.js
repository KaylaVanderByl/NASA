// webpack.config.js

module.exports = {
  output: {
    filename: 'scripts.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
                    use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]

      },
    ],
  },
};
