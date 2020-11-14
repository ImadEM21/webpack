const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const minicssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const terserJsPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: minicssExtractPlugin.loader
                    }, 
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new minicssExtractPlugin({
            filename: 'css/[name]-[contenthash].css'
        })
    ],
    optimization: {
        minimizer: [new optimizeCssPlugin(), new terserJsPlugin({parallel: true})],
        splitChunks: {
            chunks: 'all'
        }
    }
});