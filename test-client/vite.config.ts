import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/predict-and-ocr": "http://localhost:8080/api/predict-and-ocr",
    },
    host: true,
  },
});
