const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { loadavg } = require('os');

module.exports = {
    entry: {
        'index': './src/index.js',
        'video': './src/video.js'
    },
    output: {
        filename: 'js/[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.mp4$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            outputPath: 'medias'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 51200,
                            name: '[name]-[contenthash].[ext]',
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            outputPath: 'fonts'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: 'src/templates/index.html',
            filename: 'index.html',
            title: 'Bienvenu sur mon site',
            chunks: ['index']
        }),
        new htmlWebpackPlugin({
            template: 'src/templates/video.html',
            filename: 'video.html',
            title: 'Ma vidéo',
            chunks: ['video']
        })
    ]
}