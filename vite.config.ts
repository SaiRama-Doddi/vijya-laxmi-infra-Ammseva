import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
  ],
  resolve: {
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
