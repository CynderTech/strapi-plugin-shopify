import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
	async find(ctx) {
		const { orders } = await strapi
			.plugin('shopify')
			.service('admin')
			.retrieveOrders(ctx);

		ctx.send(orders);
	},
});
