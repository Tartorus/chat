var config = {
   entry: './main.js',

   output: {
      path: __dirname +'/client',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8081,
      proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/',
        secure: false
      }
    }
   },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;
