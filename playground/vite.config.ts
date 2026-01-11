import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	root: __dirname,
	resolve: {
		alias: {
			"vue-feature-flags": path.resolve(__dirname, "../src"),
		},
	},
	server: {
		port: 5173,
	},
});
