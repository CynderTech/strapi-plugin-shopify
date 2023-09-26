/* eslint-disable import/extensions */
import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';

const { name } = pluginPkg.strapi;

export default {
	register(app: any) {
		const plugin = {
			id: pluginId,
			initializer: Initializer,
			isReady: false,
			name,
		};

		app.createSettingSection(
			{
				id: `${pluginId}.plugin.name`,
				intlLabel: {
					id: `${pluginId}.plugin.name`,
					defaultMessage: 'Shopify Plugin',
				},
			}, // Section to create
			[
				// links
				{
					intlLabel: {
						id: `${pluginId}.plugin.name`,
						defaultMessage: 'Configuration',
					},
					id: `${pluginId}.plugin.name`,
					to: `/settings/${pluginId}`,
					async Component() {
						const component = await import(
							/* webpackChunkName: "email-settings-page" */ './components/SettingsWrapper'
						);

						return component;
					},
				},
			],
		);

		app.registerPlugin(plugin);
	},

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	bootstrap(app: any) {},

	async registerTrads(app: any) {
		const { locales } = app;

		const importedTrads = await Promise.all(
			(locales as any[]).map(
				(locale) =>
					// eslint-disable-next-line implicit-arrow-linebreak
					import(`./translations/${locale}.json`)
						.then(({ default: data }) => ({
							data: prefixPluginTranslations(data, pluginId),
							locale,
						}))
						.catch(() => ({
							data: {},
							locale,
						})),
				// eslint-disable-next-line function-paren-newline
			),
		);

		return Promise.resolve(importedTrads);
	},
};
