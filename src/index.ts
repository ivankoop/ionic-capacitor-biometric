import { registerPlugin } from '@capacitor/core';
import type { IonicCapacitorBiometricPlugin } from './definitions';

const IonicCapacitorBiometric = registerPlugin<IonicCapacitorBiometricPlugin>('IonicCapacitorBiometricPlugin');

export * from './definitions';
export { IonicCapacitorBiometric };
