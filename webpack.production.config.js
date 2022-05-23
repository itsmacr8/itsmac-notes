const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// FOR PURGE CSS TO WORK START
const glob = require('glob')
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PurgeCssPluginPATHS = {
    src: path.join(__dirname, 'src')
}
// FOR PURGE CSS TO WORK END


module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'src/js/[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 10000,
            automaticNameDelimiter: '_'
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
                exclude: /node_modules/
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Notes | ITS MAC',
            description: 'ITS MAC saves his notes here.',
            template: 'src/templates/index.html',
            publicPath: ''
        }),
        new HtmlWebpackPlugin({
            filename: 'principles_of_accounting.html',
            title: 'Principles of Accounting | ITS MAC',
            description: 'Principles of Accounting notes',
            template: 'src/templates/first_year/principles_of_accounting.html',
            publicPath: ''
        }),
        new HtmlWebpackPlugin({
            filename: 'principles_of_finance.html',
            title: 'Principles of Finance | ITS MAC',
            description: 'Principles of Finance notes',
            template: 'src/templates/first_year/principles_of_finance.html',
            publicPath: ''
        }),
        new HtmlWebpackPlugin({
            filename: 'principles_of_management.html',
            title: 'Principles of Management | ITS MAC',
            description: 'Principles of Management notes',
            template: 'src/templates/first_year/principles_of_management.html',
            publicPath: ''
        }),
        new HtmlWebpackPlugin({
            filename: 'principles_of_marketing.html',
            title: 'Principles of Marketing | ITS MAC',
            description: 'Principles of Marketing notes',
            template: 'src/templates/first_year/principles_of_marketing.html',
            publicPath: ''
        }),
        new HtmlWebpackPlugin({
            filename: 'micro_economics.html',
            title: 'Micro Economics | ITS MAC',
            description: 'Micro Economics notes',
            template: 'src/templates/first_year/micro_economics.html',
            publicPath: ''
        }),
        new HtmlWebpackPlugin({
            filename: 'history_of_the_emergence_of_independent_bangladesh.html',
            title: 'History of the Emergence of Independent Bangladesh | ITS MAC',
            description: 'History of the Emergence of Independent Bangladesh notes',
            template: 'src/templates/first_year/history_of_the_emergence_of_independent_bangladesh.html',
            publicPath: ''
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PurgeCssPluginPATHS.src}/**/*`, { nodir: true }),
        })
    ]
};
