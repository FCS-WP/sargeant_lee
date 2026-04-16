import { defineConfig } from "vite";
import { resolve } from "path";
import { existsSync } from "fs";

// Child theme paths
const childDir = resolve(__dirname, "src/wp-content/themes/ai-zippy-child");
const childSrc = resolve(childDir, "src");

// Check if child theme has source files
const childScss = resolve(childSrc, "scss/style.scss");
const childJs = resolve(childSrc, "js/child.js");

// Build input only if source files exist
const input = {};

if (existsSync(childScss)) {
	input["style"] = childScss;
}

if (existsSync(childJs)) {
	input["child"] = childJs;
}

export default defineConfig({
	build: {
		outDir: resolve(childDir, "assets/dist"),
		emptyOutDir: true,

		// Watch mode for `npm run dev`
		watch: process.env.NODE_ENV === "development" ? {} : null,

		rollupOptions: {
			input,
			output: {
				entryFileNames: "js/[name].js",
				chunkFileNames: "js/chunks/[name]-[hash].js",
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith(".css")) {
						return "css/[name].css";
					}
					return "assets/[name]-[hash][extname]";
				},
			},
		},

		manifest: true,
		sourcemap: true,
	},

	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
});
