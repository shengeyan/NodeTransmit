import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
const port = 3000

// 配置代理目标地址，即后端服务地址
const targetUrl = 'https://api.imooc-front.lgdsunday.club/'

// 使用 http-proxy-middleware 创建代理
const apiProxy = createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  // pathRewrite: { '^/api': '' },
  onProxyReq (proxyReq, req, res) {
    // 在这里添加 icode 请求头
    proxyReq.setHeader('icode', '1762FB25D76D1A29')
  }
})

// 将所有 /api 请求都转发到后端服务
app.use('/api', apiProxy)

// 启动服务器
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`)
})

app.use((req, res, next) => {
  console.log(`收到请求: ${req.method} ${req.url}`)
  next()
})