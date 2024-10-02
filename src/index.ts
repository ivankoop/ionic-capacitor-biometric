import { registerPlugin } from '@capacitor/core';

import type { ExamplePlugin } from './definitions';

const Example = registerPlugin<ExamplePlugin>('Example', {
  // @ts-ignore
  web: () => import('./web').then((m) => new m.ExampleWeb()),
});

export * from './definitions';
export { Example };
