const path = require('path');
const htmlWebapckPlugin = require('html-webpack-plugin');

// 配置文件要求我们必须导出一个配置对象
module.exports = {

    // 入口
    entry: path.resolve(__dirname, './src/main.js'),

    // 输出
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle_[chunkhash:8].js'
    },

    //  插件配置
    plugins: [

        // 自动注入打包好的js文件到body里
        new htmlWebapckPlugin({
            template: './src/index.html',        // 要处理的html
            filename: 'index.html',                 // 处理后的html名称
            inject: 'body',                               // 自动注入js到什么地方
        }),
    ],

    // loader的作用是为了让webpack可以打包其他类型的模块
    module: {

        // 配置loader, 该配置选项是必须的
        rules: [

            // 打包css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            // 打包less
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // 打包url文件
            {
                test: /\.(png|jpg|gif|jpeg|svg|ttf|woff)$/,
                use: [
                    // 指定小于10kb的图片才转为base64编码打包
                    {loader: 'url-loader', options: {limit: 10240}}
                ]
            },

            // 转换特殊语法编写的js文件
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/  // 如果项目引入了node-modules的东西,不转换它们
            },

            // 解析vue文件
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },

    // webpack-dev-server工具配置
    /* devServer: {
        contentBase: 'dist',
        port: 8080,
        open: true,
        inline: true,
        progress: true,
    } */
};