var path = require('path');

module.exports = {
    entry: ['./public/js/main'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'react']
                }
            }]
    }
};