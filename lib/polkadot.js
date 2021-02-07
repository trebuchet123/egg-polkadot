'use strict';

const assert = require('assert');
const ApiPromise = require('@polkadot/api').ApiPromise;
const WsProvider = require('@polkadot/api').WsProvider;
const cryptoWaitReady = require('@polkadot/util-crypto').cryptoWaitReady;

module.exports = app => {
  app.addSingleton('polkadot', connect);
};

async function connect(config, app) {
  assert(config.url, '[egg-polkadot] \'url is required on config\'');

  app.coreLogger.info('[egg-polkadot] client connecting %s', config.url);

  await cryptoWaitReady();

  const provider = new WsProvider(config.url);
  const client = await ApiPromise.create({ ...config.options, provider });

  client.on('connected', info => {
    app.coreLogger.info('[egg-polkadot] client connect success [%s]', config.url);
    app.coreLogger.info(info);
  });

  client.on('error', err => {
    app.coreLogger.error('[egg-polkadot] client connect error [%s]', config.url);
    app.coreLogger.error(err);
  });

  client.on('disconnected', info => {
    app.coreLogger.info('[egg-polkadot] client disconnected [%s]', config.url);
    app.coreLogger.info(info);
  });

  app.beforeStart(async () => {
    try {
      await client.isReadyOrError;
      app.coreLogger.info(`[egg-polkadot] instance[${config.url}] is ready`);
    } catch (err) {
      app.coreLogger.error(err);
    }
  });

  return client;
}
