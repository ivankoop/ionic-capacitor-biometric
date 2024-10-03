import { registerPlugin } from '@capacitor/core';

import type { IonicCapacitorBiometricPlugin } from './definitions';

const IonicCapacitorBiometric = registerPlugin<IonicCapacitorBiometricPlugin>('IonicCapacitorBiometric');

export * from './definitions';
export { IonicCapacitorBiometric };
