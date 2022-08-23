const path = require("path");
const ESlintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',  //相对路径
  // 输出
  output: {
    // __dirname node.js中的变量，代表当前文件的文件夹
    // path 所有文件的输出路径，filename 入口文件打包输出的文件名
    path: path.resolve(__dirname, 'dist'),   //绝对路径
    filename: 'js/main.js',
    // 在打包前，自动清空上一次打包结果目录
    clean:true
  },
  // 加载器
  module:{
    rules:[
      {
        test:/\.css$/i,   //检测.css结尾的文件
        //use 执行顺序：从后往前
        // css-loader 将css资源编译成 commonjs 模块引入到js中
        // style-loader 将js中的css通过创建style标签加到到html文件中
        use:['style-loader','css-loader']  
      },
      {
        test:/\.less$/i,
        // less-loader 将less编译成css
        use:['style-loader','css-loader','less-loader']
      },
      {
        test:/\.(png|jpe?g|gif|webp)/i,
        type:"asset",
        parser: {
          dataUrlCondition: {
            // 小于 maxSize kb大小的图片转为base64
            maxSize: 10 * 1024
          }
        },
        generator:{
          // 输出图片名称
          // [hash:10] hash值取前10位
          filename:"static/images/[hash:10][ext][query]"
        }
      },
      {
        test: /\.m?js$/,
        // exclude 这些文件不处理
        exclude: /(node_modules|bower_components)/,  
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  },
  // 插件
  plugins:[
    new ESlintPlugin({
      // 指定文件根目录，检测哪些文件
      context: path.resolve(__dirname,'src')
    }),
    new HtmlWebpackPlugin({
      // template: 以此路径下的文件为模版，创建新的 html 文件
      // 新的文件特点：1.dom结构和原本的一致 2.自动引入打包的资源
      template:path.resolve(__dirname,'public/index.html')
    })
  ],
  // 模式
  mode: 'development',
  // 开发服务器
  // 不会输出打包资源，是在内存中编译打包的
  devServer:{
    host: "localhost",
    port: "3000",
    open: true  //是否自动打开浏览器
  }
}