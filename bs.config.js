import browserSync from "browser-sync";
import { readFileSync } from "fs";
import { createProxyMiddleware } from "http-proxy-middleware";

// Read PROJECT_HOST from .env
const envContent = readFileSync(".env", "utf-8");
const hostMatch = envContent.match(/PROJECT_HOST=(.+)/);
const wpUrl = hostMatch ? hostMatch[1].trim() : "http://localhost:24";
const themeDir = "src/wp-content/themes/ai-zippy";
const childDir = "src/wp-content/themes/ai-zippy-child";

// Proxy middleware: plugin/wp-includes requests on :3000 → real WP origin
const wpProxy = createProxyMiddleware({
	target: wpUrl,
	changeOrigin: true,
	// Only intercept paths that BrowserSync itself doesn't serve
});

browserSync.create().init({
	proxy: wpUrl,
	port: 3000,
	open: false,
	notify: false,

	middleware: [
		// Forward plugin & wp-includes asset requests to real WP server
		{
			route: "/wp-content/plugins",
			handle: wpProxy,
		},
		{
			route: "/wp-includes",
			handle: wpProxy,
		},
	],

	files: [
		// CSS inject without reload
		`${themeDir}/assets/dist/css/**/*.css`,
		`${childDir}/assets/dist/css/**/*.css`,

		// Full reload on JS, PHP, HTML, block changes
		{
			match: [
				`${themeDir}/assets/dist/js/**/*.js`,
				`${themeDir}/assets/blocks/**/*.js`,
				`${themeDir}/assets/blocks/**/*.css`,
				`${themeDir}/**/*.php`,
				`${themeDir}/templates/**/*.html`,
				`${themeDir}/parts/**/*.html`,
				`${themeDir}/patterns/**/*.php`,
				`${childDir}/assets/dist/js/**/*.js`,
				`${childDir}/assets/blocks/**/*.js`,
				`${childDir}/assets/blocks/**/*.css`,
				`${childDir}/**/*.php`,
				`${childDir}/templates/**/*.html`,
				`${childDir}/parts/**/*.html`,
				`${childDir}/patterns/**/*.php`,
			],
			fn: function (event, file) {
				this.reload();
			},
		},
	],

	// Don't sync scroll/clicks across devices (optional)
	ghostMode: false,
});
