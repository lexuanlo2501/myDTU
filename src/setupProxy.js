const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware('/login',
            {
               target: 'url',
               changeOrigin: true 
            })
    )
}