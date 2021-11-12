module.exports = {
    devServer: {
        proxy: {
            '/': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'http://127.0.0.1:5000',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    }
}
