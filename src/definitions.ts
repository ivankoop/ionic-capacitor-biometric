export interface IonicCapacitorBiometricPlugin {
  /**
   * Checks if biometric authentication is available and enabled.
   * @returns A Promise that resolves with an object containing success status and message.
   */
  isAvailable(): Promise<{ success: boolean; message: string }>;

  /**
   * Requests biometric permissions from the user.
   * @returns A Promise that resolves with an object containing success status and message.
   */
  requestBiometricPermissions(): Promise<{ success: boolean; message: string }>;

  /**
   * Authenticates the user using biometrics.
   * @returns A Promise that resolves with an object containing success status and message.
   */
  authenticate(): Promise<{ success: boolean; message: string }>;

  /**
   * Stores user credentials securely in the keychain.
   * @param options An object containing the username and trusted token.
   * @returns A Promise that resolves with an object containing success status and message.
   */
  storeCredentials(options: { username: string; trustedToken: string }): Promise<{ success: boolean; message: string }>;

  /**
   * Retrieves user credentials from the keychain.
   * @returns A Promise that resolves with an object containing success status, message, and the stored
   * username and trusted token.
   */
  retrieveCredentials(): Promise<{ success: boolean; message: string; username?: string; trustedToken?: string }>;
}
