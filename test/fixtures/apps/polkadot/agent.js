'use strict';

const fs = require('fs');
const path = require('path');

class AppBootHook {
  constructor(agent) {
    this.agent = agent;
  }

  async didReady() {
    const p = path.join(__dirname, 'run/agent_result.json');
    fs.existsSync(p) && fs.unlinkSync(p);

    const ctx = await this.agent.createAnonymousContext();
    const properties = await ctx.app.polkadot.rpc.system.properties();
    fs.writeFileSync(p, JSON.stringify(properties.toHuman()));
  }
}

module.exports = AppBootHook;
