export interface IonicCapacitorBiometricPlugin {
  requestBiometricPermissions(): Promise<void>;
  authenticate(): Promise<void>;
  storeCredentials(options: { username: string; trustedToken: string }): Promise<void>;
  retrieveCredentials(): Promise<{ username: string; trustedToken: string }>;
}
