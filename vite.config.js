import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    rollupOptions: {
      input:{  //项目打包的入口默认是index.html
        main: './index.html'
      },
     output:{
      manualChunks(id) {
      /*
      将第三方库使用分割的效果是。假如修改了业务代码之后，只有业务代码发生了改变，
      那么第三方库的代码就不会被打包，从而减少了打包的体积。并且因为打包之后的hash没变
      浏览器会通过吧hash值作为文件名，从而实现缓存的效果。就不需要再次下载了
      */
      /*
      这里是写一个手动分包的策略
      1. 先判断是否是node_modules中的文件
      2. 如果是react相关的文件，就放到react包中
      3. 如果是antd相关的文件，就放到antd包中
      4. 其他的文件就放到vendor包中
      */
       if (id.includes('node_modules')) {
        if(id.includes('react')){
          return "react"
        }
         if(id.includes('antd')){
          return "antd"
        }
        else {
          return "vendor"
        }
        }
        /*
        5. 如果是src/ulits中的文件，就放到ulits包中
         剩余就是其他的业务
        */
        if(id.includes('src/ulits')){
          return "ulits"
        }
      }
     }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
