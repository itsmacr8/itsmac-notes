const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
    entry: {
        'base': './src/typescript/pages/_base.ts',
        'index': './src/index.ts',
        'note_app': './src/typescript/pages/note_app.ts',
        'principles_of_finance': './src/typescript/pages/principles_of_finance.ts',
        'principles_of_accounting': './src/typescript/pages/principles_of_accounting.ts',
    },
    output: {
        filename: 'src/js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'auto',
        clean: true,
    },
    mode: 'development',
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path]/[name].[ext]',
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            url: false
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'src/css/[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['base', 'index'],
            title: 'Notes | ITS MAC',
            description: 'ITS MAC saves his notes here.',
            template: 'src/templates/index.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'principles_of_accounting.html',
            chunks: ['base', 'principles_of_accounting'],
            title: 'Principles of Accounting | ITS MAC',
            description: 'Principles of Accounting notes',
            template: 'src/templates/first_year/principles_of_accounting.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'principles_of_finance.html',
            chunks: ['base', 'principles_of_finance'],
            title: 'Principles of Finance | ITS MAC',
            description: 'Principles of Finance notes',
            template: 'src/templates/first_year/principles_of_finance.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'principles_of_management.html',
            chunks: ['base'],
            title: 'Principles of Management | ITS MAC',
            description: 'Principles of Management notes',
            template: 'src/templates/first_year/principles_of_management.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'principles_of_marketing.html',
            chunks: ['base'],
            title: 'Principles of Marketing | ITS MAC',
            description: 'Principles of Marketing notes',
            template: 'src/templates/first_year/principles_of_marketing.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'micro_economics.html',
            chunks: ['base'],
            title: 'Micro Economics | ITS MAC',
            description: 'Micro Economics notes',
            template: 'src/templates/first_year/micro_economics.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'history_of_the_emergence_of_independent_bangladesh.html',
            chunks: ['base'],
            title: 'History of the Emergence of Independent Bangladesh | ITS MAC',
            description: 'History of the Emergence of Independent Bangladesh notes',
            template: 'src/templates/first_year/history_of_the_emergence_of_independent_bangladesh.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'note_app.html',
            chunks: ['base', 'note_app'],
            title: 'Note App | ITS MAC',
            description: 'A note app',
            template: 'src/templates/note_app.html',
        }),
        new ESLintPlugin({
            extensions: ['.js', '.ts'],
            exclude: ['node_modules', 'dist'],
            fix: true
        })
    ]
};