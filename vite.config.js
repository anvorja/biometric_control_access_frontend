// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['react-pdf']
//   }
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-pdf']
  },
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    }
  }
});