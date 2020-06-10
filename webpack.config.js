const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: {
        app: './src/index.js'
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: '[name].ext'
            },
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new MiniCssExtractPlugin({
          filename: "css/[name].css",
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/img', to: 'img' },
              { from: './src/fonts', to: 'fonts' },
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: './index.html',
        }),
    ],
}