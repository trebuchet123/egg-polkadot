'use strict';

const Service = require('egg').Service;

class SystemService extends Service {
  async properties() {
    const properties = await this.ctx.app.polkadot.rpc.system.properties();
    return properties.toHuman();
  }
}

module.exports = SystemService;
