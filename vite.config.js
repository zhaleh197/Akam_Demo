import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // The KYC service (E:\1405\kyc). The site calls /kyc-api/..., forwarded
  // here, so the browser sees one origin and the service needs no CORS setup.
  const kycTarget = env.KYC_API_TARGET || 'http://127.0.0.1:8000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/kyc-api': {
          target: kycTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/kyc-api/, ''),
        },
      },
    },
  }
})
