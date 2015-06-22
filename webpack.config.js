
module.exports = {

  entry: './entry.jsx',

  output: {
    filename: 'bundle.js',
    path: __dirname,
  },

  module: {
    loaders: [
      { test: /(\.js$|\.jsx$)/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style!css!cssnext' },
    ]
  },

  cssnext: {
    features: {
      import : {
        path : ['node_modules']
      },
      colorRgba: false,
      rem: false,
      pseudoElements: false,
    }
  }

};

