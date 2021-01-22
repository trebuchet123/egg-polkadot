'use strict';

exports.polkadot = {
  client: {
    url: 'ws://221.122.102.163:9944',
    options: {
      types: {
        Address: 'AccountId',
        LookupSource: 'AccountId',
        URC10: {
          symbol: 'Vec<u8>',
          name: 'Vec<u8>',
          decimals: 'u8',
          max_supply: 'u64',
        },
      },
    },
  },
  agent: true,
};

exports.keys = 'polkadot';
