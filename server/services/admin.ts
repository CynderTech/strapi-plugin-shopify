import { Strapi } from '@strapi/strapi';
import axios from 'axios';
import qs from 'qs';

const instance = axios.create({});

instance.defaults.paramsSerializer = (params) => qs.stringify(params);
instance.interceptors.response.use(({ data }) => data);

export default ({ strapi }: { strapi: Strapi }) => ({
	async retrieveProducts() {
		const settings = await strapi
			.store({ type: 'plugin', name: 'shopify', key: 'settings' })
			.get();

		instance.defaults.headers['X-Shopify-Access-Token'] =
			settings.accessToken;

		const data = await instance.get(
			`${settings.baseUrl}/admin/products.json`,
		);

		return data;
	},
});
