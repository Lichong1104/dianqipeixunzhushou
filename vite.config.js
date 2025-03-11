import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // 这里的路径是相对于项目根目录的
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://119.8.170.199:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
