module.exports = {
  entry : './ts/main.ts',
  output : {
    filename : './js/bundle.js'
  },

  resolve : {
    extensions : ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders : [
      { test: /\.ts(x?)$/, loader: 'ts-loader'}
    ]
  }
}
