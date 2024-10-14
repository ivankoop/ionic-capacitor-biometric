export interface IonicCapacitorBiometricPlugin {
  /**
   * Checks if biometric authentication is available and enabled.
   * @returns A Promise that resolves if available, or rejects with an error message.
   */
  isAvailable(): Promise<void>;

  /**
   * Requests biometric permissions from the user.
   * @returns A Promise that resolves on success, or rejects with an error message.
   */
  requestBiometricPermissions(): Promise<void>;

  /**
   * Authenticates the user using biometrics.
   * @returns A Promise that resolves on successful authentication, or rejects with an error message.
   */
  authenticate(): Promise<void>;

  /**
   * Stores user credentials securely in the keychain.
   * @param options An object containing the username and trusted token.
   * @returns A Promise that resolves on success, or rejects with an error message.
   */
  storeCredentials(options: { username: string; trustedToken: string }): Promise<void>;

  /**
   * Retrieves user credentials from the keychain.
   * @returns A Promise that resolves with the stored username and trusted token.
   */
  retrieveCredentials(): Promise<{ username: string; trustedToken: string }>;
}
