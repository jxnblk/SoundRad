
module.exports = {
  entry: './entry.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' },
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
      customProperties: {
        variables: {
          'bold-font-weight': '500',
          'heading-font-weight': '500',
          'button-font-weight': '500',
          'button-font-size': 'var(--h5)',
        }
      }
    }
  }
};

