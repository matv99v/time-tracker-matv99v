module.exports = {
  entry: './src/main.js',
  output: {
    filename: './public/build/build.js'
  },
  module: {
    loaders: [
        { test: /\.js$/, loader: "babel"}
    ]
  }
};
