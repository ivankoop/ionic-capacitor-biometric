# ionic-capacitor-biometric
[![CI Pipeline](https://github.com/ivankoop/ionic-capacitor-biometric/actions/workflows/ci.yml/badge.svg)](https://github.com/ivankoop/ionic-capacitor-biometric/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/ionic-capacitor-biometric.svg)](https://www.npmjs.com/package/ionic-capacitor-biometric)

## Project Purpose and Goal

The primary goal of this project was personal learning, but I decided to make it public. There are still features to be added, such as Swift tests. If you're interested, feel free to contribute!

**Warning**: This is not production ready.

## Overview

The `ionic-capacitor-biometric` plugin allows you to add biometric authentication (e.g., Face ID, Touch ID) to your Ionic applications. This plugin supports iOS, and Android support is currently a work in progress.

## Installation

Install the plugin using npm:

```sh
npm install ionic-capacitor-biometric
npx cap sync
```

### iOS Configuration

To use biometric features on iOS, you need to add a key to your `Info.plist` file:

```xml
<key>NSFaceIDUsageDescription</key>
<string>We need to use Face ID for secure authentication.</string>
```

This key is required to provide a description for why your app needs access to Face ID or Touch ID.

### Android Configuration

**Note**: Android support is still a work in progress. Check back for updates.

## Methods

The plugin provides several methods for interacting with biometric authentication. Below is a list of available methods with examples.

### Importing the Plugin

```typescript
import { IonicCapacitorBiometric } from 'ionic-capacitor-biometric';
```

### 1. `isAvailable()`

Checks if biometric authentication is available and enabled on the device.

```typescript
try {
  const response = await IonicCapacitorBiometric.isAvailable();
  console.log(response.message);
} catch (error) {
  console.error('Error:', error);
}
```

### 2. `requestBiometricPermissions()`

Requests biometric permissions from the user.

```typescript
try {
  const response = await IonicCapacitorBiometric.requestBiometricPermissions();
  console.log(response.message);
} catch (error) {
  console.error('Error:', error);
}
```

### 3. `authenticate()`

Authenticates the user using biometrics.

```typescript
try {
  const response = await IonicCapacitorBiometric.authenticate();
  console.log(response.message);
} catch (error) {
  console.error('Error:', error);
}
```

### 4. `storeCredentials(options)`

Stores user credentials securely in the keychain.

```typescript
try {
  const response = await IonicCapacitorBiometric.storeCredentials({ username: 'user123', trustedToken: 'secureToken' });
  console.log(response.message);
} catch (error) {
  console.error('Error:', error);
}
```

### 5. `retrieveCredentials()`

Retrieves user credentials from the keychain.

```typescript
try {
  const response = await IonicCapacitorBiometric.retrieveCredentials();
  console.log(response.message);
  console.log('Username:', response.username);
  console.log('Trusted Token:', response.trustedToken);
} catch (error) {
  console.error('Error:', error);
}
```

## Security

- **iOS**: Trusted tokens are stored securely in the iOS Keychain, which is a secure storage mechanism provided by the operating system. The Keychain is designed to protect sensitive information, such as passwords and authentication tokens, ensuring they are encrypted and accessible only by authorized processes. This provides a high level of security and helps users trust that their credentials are safely managed.

## Notes

- **iOS**: Ensure that you have added the necessary key (`NSFaceIDUsageDescription`) to your `Info.plist` file to avoid runtime errors.
- **Android**: The Android implementation is still under development and will be released in a future update.

## License

This project is licensed under the MIT License.

