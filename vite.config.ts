import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/tests/setup.ts",
    },
    server: {
        host: true,
        port: 5173,
    },
    preview: {
        port: 5173,
    },
});
