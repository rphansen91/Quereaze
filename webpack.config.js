var webpack = require('webpack');

var config = {
    entry: "./src/main.ts",
    output: {
        path: "./dist",
        filename: "main.js",
        libraryTarget: 'commonjs'
    },
    devServer: {
        port: 3030
    },
    plugins: [
        // new webpack.DefinePlugin({
        //   NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        // })
      ],
    module: {
        loaders: [
            { 
                test: /\.tsx?$/, 
                loader: 'ts-loader' 
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.html$/,
		        loader: 'raw',
                exclude: /node_modules/
            }
        ]
    }
}

if (process.env.NODE_ENV == "production") {
    config.entry = "./src/main.ts";
    config.externals = {
        'rxjs': 'rxjs'
    };
}

module.exports = config;