import type {
	ExpressiveCodeConfig,
	GitHubEditConfig,
	ImageFallbackConfig,
	LicenseConfig,
	NavBarConfig,
	NoticeConfig,
	ProfileConfig,
	SiteConfig,
	UmamiConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const noticeConfig: NoticeConfig = {
    enable: true,
    level: "info",
    content: "我们刚刚添加了文章更新系统，自此之后的每次文章更新都会通过右下角的小铃铛提醒您。",
};

export const siteConfig: SiteConfig = {
	title: "7Star's Blog",
	subtitle: "技术分享与实践",
	description:
		"分享网络技术、服务器部署、内网穿透、静态网站搭建、CDN优化、容器化部署等技术教程与实践经验的个人技术博客，专注于云原生、无服务器架构和前后端开发。",

	keywords: [],
	lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 361, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
		forceDarkMode: false, // Force dark mode and hide theme switcher
	},
	banner: {
		enable: false,
		src: "/xinghui.avif", // Relative to the /src directory. Relative to the /public directory if it starts with '/'

		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "Pixiv @chokei", // Credit text to be displayed

			url: "https://www.pixiv.net/artworks/122782209", // (Optional) URL link to the original artwork or artist's page
		},
	},
	background: {
		enable: true, // Enable background image
		src: "/random/h", // Background image URL (supports HTTPS)
		position: "center", // Background position: 'top', 'center', 'bottom'
		size: "cover", // Background size: 'cover', 'contain', 'auto'
		repeat: "no-repeat", // Background repeat: 'no-repeat', 'repeat', 'repeat-x', 'repeat-y'
		attachment: "fixed", // Background attachment: 'fixed', 'scroll', 'local'
		opacity: 1, // Background opacity (0-1)
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "./favicon.ico", // Path of the favicon, relative to the /public directory
			//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
			//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		},
	],
	officialSites: [
		{ url: "https://blog.843003.xyz", alias: "CN" },
		{ url: "https://b.843003.xyz", alias: "Global" },
	],
	server: [
		{ url: "", text: "Blog" },
		{ url: "https://pic1.acofork.com", text: "RandomPic" },
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "友链",
			url: "/friends/", // Internal links should not include the base path, as it is automatically added
			external: false, // Show an external link icon and will open in a new tab
		},
		{
			name: "赞助",
			url: "/sponsors/", // Internal links should not include the base path, as it is automatically added
			external: false, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "https://chat-page.oss-cn-hangzhou.aliyuncs.com/2041/upload/48651322a16142938ee3c910d41b1b11/d915d1b324de4904b72799ec0ac2c4ad.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "7Star",
	bio: "没有绝对安全的系统。",
	links: [
		{
			name: "GitHub",
			icon: "github", // Local icon
			url: "https://github.com/Star7-Files-Hub",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const imageFallbackConfig: ImageFallbackConfig = {
	enable: false,
	originalDomain: "https://eopfapi.acofork.com/pic?img=ua",
	fallbackDomain: "https://eopfapi.acofork.com/pic?img=ua",
};

export const umamiConfig: UmamiConfig = {
    enable: false, 
    baseUrl: "", 
    shareId: "", 
    timezone: "Asia/Shanghai",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};

export const gitHubEditConfig: GitHubEditConfig = {
	enable: true,
	baseUrl: "https://github.com/Star7-Files-Hub/fuwari/blob/main/src/content/posts",
};

// todoConfig removed from here
