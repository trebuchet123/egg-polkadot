'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const properties = await ctx.service.system.properties();
    ctx.body = properties;
  }
}

module.exports = HomeController;
