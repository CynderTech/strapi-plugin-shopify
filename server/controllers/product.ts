import { Strapi } from '@strapi/strapi';
import { errors } from '@strapi/utils';
import { isEmpty } from 'lodash';

export default ({ strapi }: { strapi: Strapi }) => ({
	async find(ctx) {
		const { products } = await strapi
			.plugin('shopify')
			.service('admin')
			.retrieveProducts(ctx);

		ctx.send(products);
	},
});
