export default {
  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
    "syntax-dynamic-import"
  ],
  define: {'process.env.APP_ENV': process.env.APP_ENV },
  disableCSSModules:true,
  extraResolveExtensions:['.js', '.less', '.json'],
  html: {
    title:'管理信息系统',
    template: './src/index.ejs',
    favicon:'./src/assets/favicon.ico',
    filename:'index.html',
    hash:true,
    inject: true,
    catch:true
  }
}
