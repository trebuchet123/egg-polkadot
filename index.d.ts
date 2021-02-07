import 'egg';
import { ApiPromise } from '@polkadot/api';

declare module 'egg' {
  interface Application {
    polkadot: ApiPromise
  }
}
