// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        open: true,
        host: '192.168.1.6',
        port: '8080',
        proxy: {
            '/netease': {
                target: 'http://v1.itooi.cn',
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {
                    '^/netease': '/netease'
                }
            }
        }
    }
}
