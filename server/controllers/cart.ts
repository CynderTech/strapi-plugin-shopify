import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
	async findOne(ctx) {
		const { draft_order: draftOrder } = await strapi
			.plugin('shopify')
			.service('admin')
			.retrieveCart(ctx);

		ctx.send(draftOrder);
	},
	async upsert(ctx) {
		const { draft_order: draftOrder } = await strapi
			.plugin('shopify')
			.service('admin')
			.upsertCart(ctx);

		ctx.send(draftOrder);
	},
	async checkout(ctx) {
		const { draft_order: draftOrder } = await strapi
			.plugin('shopify')
			.service('admin')
			.checkoutCart(ctx);

		ctx.send(draftOrder);
	},
});
