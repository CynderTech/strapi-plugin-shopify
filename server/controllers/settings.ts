import { Strapi } from '@strapi/strapi';
import { errors } from '@strapi/utils';
import { isEmpty } from 'lodash';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getSettings(ctx) {
    const settings = await strapi
      .store({ type: 'plugin', name: 'shopify', key: 'settings' })
      .get();

    ctx.send({ settings });
  },
  async updateSettings(ctx) {
    if (isEmpty(ctx.request.body)) {
      throw new errors.ValidationError('Request body cannot be empty');
    }

    await strapi
      .store({ type: 'plugin', name: 'shopify', key: 'settings' })
      .set({ value: ctx.request.body });

    ctx.send({ ok: true });
  },
});
