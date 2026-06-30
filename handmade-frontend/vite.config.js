import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/fetchProduct':             { target: 'http://localhost:8080', changeOrigin: true },
      '/insertProduct':            { target: 'http://localhost:8080', changeOrigin: true },
      '/updateProduct':            { target: 'http://localhost:8080', changeOrigin: true },
      '/deleterecordbyProductId':  { target: 'http://localhost:8080', changeOrigin: true },
      '/fetchOrder':               { target: 'http://localhost:8080', changeOrigin: true },
      '/insertOrder':              { target: 'http://localhost:8080', changeOrigin: true },
      '/updateOrder':              { target: 'http://localhost:8080', changeOrigin: true },
      '/deleterecordbyOrderId':    { target: 'http://localhost:8080', changeOrigin: true },
      '/fetchCategory':            { target: 'http://localhost:8080', changeOrigin: true },
      '/fetchSeller':              { target: 'http://localhost:8080', changeOrigin: true },
      '/fetchCustomer':            { target: 'http://localhost:8080', changeOrigin: true },
      '/fetchPayment':             { target: 'http://localhost:8080', changeOrigin: true },
      '/fetchShipment':            { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
})
