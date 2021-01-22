'use strict';

const assert = require('assert');
const ApiPromise = require('@polkadot/api').ApiPromise;
const WsProvider = require('@polkadot/api').WsProvider;
const cryptoWaitReady = require('@polkadot/util-crypto').cryptoWaitReady;

let count = 0;

module.exports = app => {
  app.addSingleton('polkadot', connect);
};

async function connect(config, app) {
  assert(config.url, `[egg-polkadot] 'url: ${config.url} are required on config'`);

  app.coreLogger.info('[egg-polkadot] connecting %s', config.url);

  await cryptoWaitReady();

  const provider = new WsProvider(config.url);
  const api = await ApiPromise.create({ ...config.options, provider });

  app.beforeStart(async () => {
    const isReady = await api.isReady;
    if (isReady) {
      const index = count++;
      app.coreLogger.info(`[egg-polkadot] instance[${index}] is ready`);
    }
  });

  return api;
}
