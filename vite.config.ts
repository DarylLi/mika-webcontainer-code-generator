import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{rollupOptions: {
    external: new RegExp("/(vue_tmp|vanilla_tmp|react_umi_tmp)/.*"),
  }},
  server:{
    headers:{
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    }
  }
})
