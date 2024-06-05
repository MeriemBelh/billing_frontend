const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.js', // Assuming your entry point is index.js
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: '[name].js', // Output file name, [name] will be replaced by entry point name
        publicPath: 'http://localhost:8081/' // Public path for assets
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new WebpackManifestPlugin({
            fileName: 'app-manifest.json',
            generate: (seed, files) => {
                const manifestFile = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);
                return manifestFile;
            }
        })
    ],
    devServer: {
        port: 8081,
        open: true,
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy:[ {
            context: ['/api'],
            target : 'http://localhost:9001',
            pathRewrite: {'^/api' : '/api'},
            logLevel: 'debug', /*optional*/
            changeOrigin: true,
        },]
        
        }

};
