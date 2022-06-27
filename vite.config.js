import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  server: {
    // port: 9445, // 设置服务启动端口号
    // open: false, // 设置服务启动时是否自动打开浏览器,当此值为字符串时，会被用作 URL 的路径名。
    fs: {
      strict: false
    },
    cors: true, // 允许跨域
    // 设置代理
    proxy: {
      '/join': {
        "target": "https://vip.adsl.cn",
        // "target": "http://rrq.ejcop.com"
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '/'),
      }
    }
  },
})
