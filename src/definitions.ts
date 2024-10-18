export interface IonicCapacitorBiometricPlugin {
  /**
   * Checks if biometric authentication is available and enabled.
   * @returns A Promise that resolves with an object containing a message.
   */
  isAvailable(): Promise<{ message: string }>;

  /**
   * Requests biometric permissions from the user.
   * @returns A Promise that resolves with an object containing a message.
   */
  requestBiometricPermissions(): Promise<{ message: string }>;

  /**
   * Authenticates the user using biometrics.
   * @returns A Promise that resolves with an object containing a message.
   */
  authenticate(): Promise<{ message: string }>;

  /**
   * Stores user credentials securely in the keychain.
   * @param options An object containing the username and trusted token.
   * @returns A Promise that resolves with an object containing a message.
   */
  storeCredentials(options: { username: string; trustedToken: string }): Promise<{ message: string }>;

  /**
   * Retrieves user credentials from the keychain.
   * @returns A Promise that resolves with an object containing a message and the stored username and trusted token.
   */
  retrieveCredentials(): Promise<{ message: string; username?: string; trustedToken?: string }>;
}
