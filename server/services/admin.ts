import { Strapi } from '@strapi/strapi';
import axios from 'axios';
import qs from 'qs';

const instance = axios.create({});

instance.defaults.paramsSerializer = (params) => qs.stringify(params);
instance.interceptors.response.use(({ data }) => data);

export default ({ strapi }: { strapi: Strapi }) => ({
	async retrieveProducts(ctx) {
		const { query } = ctx;
		const settings = await strapi
			.store({ type: 'plugin', name: 'shopify', key: 'settings' })
			.get();

		instance.defaults.headers['X-Shopify-Access-Token'] =
			settings.accessToken;

		const data = await instance.get(
			`${settings.baseUrl}/admin/products.json`,
			{
				params: query,
			},
		);

		return data;
	},
	async retrieveOrders(ctx) {
		const { query, state } = ctx;
		const { user } = state;
		const settings = await strapi
			.store({ type: 'plugin', name: 'shopify', key: 'settings' })
			.get();

		instance.defaults.headers['X-Shopify-Access-Token'] =
			settings.accessToken;

		const data = await instance.get(
			`${settings.baseUrl}/admin/customers/${user.shopifyCustomerId}/orders.json`,
			{
				params: query,
			},
		);

		return data;
	},
	async retrieveCart(ctx) {
		const { request, state } = ctx;
		const { body } = request;
		const { user } = state;
		const settings = await strapi
			.store({ type: 'plugin', name: 'shopify', key: 'settings' })
			.get();

		instance.defaults.headers['X-Shopify-Access-Token'] =
			settings.accessToken;

		if (!user.shopifyDraftOrderId) {
			return {
				draft_order: {},
			};
		}

		const data = await instance.get(
			`${settings.baseUrl}/admin/draft_orders/${user.shopifyDraftOrderId}.json`,
		);

		return data;
	},
	async upsertCart(ctx) {
		const { request, state } = ctx;
		const { body } = request;
		const { user } = state;
		const settings = await strapi
			.store({ type: 'plugin', name: 'shopify', key: 'settings' })
			.get();

		instance.defaults.headers['X-Shopify-Access-Token'] =
			settings.accessToken;

		let data;

		if (!user.shopifyDraftOrderId) {
			data = await instance.post(
				`${settings.baseUrl}/admin/draft_orders.json`,
				{
					draft_order: {
						...body,
						customer: {
							id: Number(user.shopifyCustomerId),
						},
					},
				},
			);

			await strapi.entityService.update(
				'plugin::users-permissions.user',
				user.id,
				{
					data: {
						shopifyDraftOrderId: String(data.draft_order.id),
					},
				},
			);
		} else {
			data = await instance.put(
				`${settings.baseUrl}/admin/draft_orders/${user.shopifyDraftOrderId}.json`,
				{
					draft_order: {
						...body,
						customer: {
							id: Number(user.shopifyCustomerId),
						},
					},
				},
			);
		}

		return data;
	},
	async checkoutCart(ctx) {
		const { request, state } = ctx;
		const { body } = request;
		const { user } = state;
		const settings = await strapi
			.store({ type: 'plugin', name: 'shopify', key: 'settings' })
			.get();

		instance.defaults.headers['X-Shopify-Access-Token'] =
			settings.accessToken;

		const data = await instance.put(
			`${settings.baseUrl}/admin/draft_orders/${user.shopifyDraftOrderId}/complete.json`,
		);

		await strapi.entityService.update(
			'plugin::users-permissions.user',
			user.id,
			{
				data: {
					shopifyDraftOrderId: null,
				},
			},
		);

		return data;
	},
});
