'use strict';


const polkadot = require('./lib/polkadot');

module.exports = app => {
  if (app.config.polkadot.app) polkadot(app);
};
