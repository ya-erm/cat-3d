const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            /*
            // images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // fonts
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // css
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
            },
            // html
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: { name: '[name].[ext]' },
            },
            */
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            favicon: path.resolve(__dirname, './src/images/cat.svg'),
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/images', to: 'images' },
                { from: 'src/models', to: 'models' },
                { from: 'src/styles', to: 'styles' },
            ],
        }),
    ],
    devServer: {
        port: 3000,
    },
};
