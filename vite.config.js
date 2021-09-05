import { resolve } from 'path'

export default {
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      }
    }
  }
}
