export interface IonicCapacitorBiometricPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
