const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    mode: 'none',
    entry: './src',
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css']
    },
    optimization: {
        minimize: true,
        minimizer: [ new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            },

            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}
