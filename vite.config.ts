import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgr from 'vite-plugin-svgr'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()]
		}
	},
	plugins: [vue(), svgr()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
})
