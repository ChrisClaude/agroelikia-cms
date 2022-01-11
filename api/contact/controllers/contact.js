'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
module.exports = {
  /**
   * Create a contact.
   *
   * @return {Object}
   */
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const {data, files} = parseMultipartData(ctx);
      data.creator = ctx.state.user.id;
      entity = await strapi.services.contact.create(data, {files});
    } else {
      ctx.request.body.creator = ctx.state.user.id;
      entity = await strapi.services.contact.create(ctx.request.body);
    }
    return sanitizeEntity(entity, {model: strapi.models.contact});
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */
  async update(ctx) {
    const {id} = ctx.params;

    let entity;

    const [contact] = await strapi.services.contact.find({
      id: ctx.params.id,
      'creator.id': ctx.state.user.id,
    });

    if (!contact) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const {data, files} = parseMultipartData(ctx);
      entity = await strapi.services.contact.update({id}, data, {
        files,
      });
    } else {
      entity = await strapi.services.contact.update({id}, ctx.request.body);
    }

    return sanitizeEntity(entity, {model: strapi.models.contact});
  },

  async delete(ctx) {
    const {id} = ctx.params;


    const [contact] = await strapi.services.contact.find({
      id: ctx.params.id,
      'creator.id': ctx.state.user.id,
    });

    if (!contact) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const entity = await strapi.services.contact.delete({id});

    return sanitizeEntity(entity, {model: strapi.models.contact});
  },

  /**
   * Retrieve logged in users' records.
   *
   * @return {Array}
   */

  async me(ctx) {
    const creator = ctx.state.user;

    if (!creator) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const data = await strapi.services.contact.find({ creator: creator.id });

    if (!data) {
      return ctx.notFound();
    }

    return sanitizeEntity(data, { model: strapi.models.contact });
  },

  async findProducts(ctx) {
    const contactId = ctx.params.id;
    const data = await strapi.services.product.find({contact: contactId});
    return sanitizeEntity(data, { model: strapi.models.product });
  }
};
