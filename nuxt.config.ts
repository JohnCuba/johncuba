// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [[
		'@nuxtjs/google-fonts',
		{
			useStylesheet: true,
			display: 'swap',
			families: {
				'New Amsterdam': [400],
			},
		},
	], '@nuxt/eslint'],
	devtools: { enabled: true },
	app: {
		head: {
			title: 'John Cuba',
			meta: [
				{
					charset: 'utf-8',
				},
				{
					name: 'description',
					content: 'Sandbox',
				},
			],
			htmlAttrs: {
				lang: 'en',
			},
		},
	},
	compatibilityDate: '2024-04-03',
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
	},
});
