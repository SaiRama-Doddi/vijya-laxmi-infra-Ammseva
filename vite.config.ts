import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": `${process.cwd()}/src`,
    },
  },
  server: {
    port: 8082,
    host: "0.0.0.0",
    strictPort: false,
  },
});

