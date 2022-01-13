'use strict';
const {parseMultipartData, sanitizeEntity} = require('strapi-utils');

const nodemailer = require('nodemailer');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
   /**
   * Create a shop.
   *
   * @return {Object}
   */
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const {data, files} = parseMultipartData(ctx);
      data.owner = ctx.state.user.id;
      entity = await strapi.services.shop.create(data, {files});
    } else {
      ctx.request.body.owner = ctx.state.user.id;
      entity = await strapi.services.shop.create(ctx.request.body);
    }
    return sanitizeEntity(entity, {model: strapi.models.shop});
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */
  async update(ctx) {
    const {id} = ctx.params;

    let entity;

    const [shop] = await strapi.services.shop.find({
      id: ctx.params.id,
      'owner.id': ctx.state.user.id,
    });

    if (!shop) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const {data, files} = parseMultipartData(ctx);
      entity = await strapi.services.shop.update({id}, data, {
        files,
      });
    } else {
      entity = await strapi.services.shop.update({id}, ctx.request.body);
    }

    return sanitizeEntity(entity, {model: strapi.models.shop});
  },

  async delete(ctx) {
    const {id} = ctx.params;


    const [shop] = await strapi.services.shop.find({
      id: ctx.params.id,
      'owner.id': ctx.state.user.id,
    });

    if (!shop) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const entity = await strapi.services.shop.delete({id});

    return sanitizeEntity(entity, {model: strapi.models.shop});
  },

  /**
   * Retrieve logged in users' records.
   *
   * @return {Array}
   */

  async me(ctx) {
    const owner = ctx.state.user;

    if (!owner) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const data = await strapi.services.shop.find({ owner: owner.id });

    if (!data) {
      return ctx.notFound();
    }

    return sanitizeEntity(data, { model: strapi.models.shop });
  },

  async findProducts(ctx) {
    const shopId = ctx.params.id;
    const data = await strapi.services.product.find({shop: shopId});
    return sanitizeEntity(data, { model: strapi.models.product });
  }
};

