// vite.config.js

import { defineConfig } from "vite";
import { path } from "path";

export default defineConfig({

    server: {
        port: 513,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }

})

