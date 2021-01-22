'use strict';


const polkadot = require('./lib/polkadot');

module.exports = agent => {
  if (agent.config.polkadot.agent) polkadot(agent);
};
