import Foundation
import Capacitor
import LocalAuthentication

@objc(IonicCapacitorBiometricPlugin)
public class IonicCapacitorBiometricPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "IonicCapacitorBiometricPlugin"
    public let jsName = "IonicCapacitorBiometric"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "requestBiometricPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "authenticate", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "storeCredentials", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "retrieveCredentials", returnType: CAPPluginReturnPromise)
    ]

    private let biometricAuthManager = BiometricAuthenticationManager()
    private let keychainWrapper = KeychainWrapper(service: "IonicCapacitorBiometricService")

    @objc func requestBiometricPermissions(_ call: CAPPluginCall) {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: "Biometric permission is required for secure access.") { success, authenticationError in
                DispatchQueue.main.async {
                    if success {
                        call.resolve()
                    } else {
                        call.reject("Failed to request biometric permissions")
                    }
                }
            }
        } else {
            let reason = error?.localizedDescription ?? "Biometrics not available or not enrolled."
            call.reject(reason)
        }
    }

    @objc func authenticate(_ call: CAPPluginCall) {
        biometricAuthManager.authenticateUser { success, error in
            DispatchQueue.main.async {
                if success {
                    call.resolve()
                } else if let error = error {
                    call.reject(error.localizedDescription)
                } else {
                    call.reject("Failed to authenticate")
                }
            }
        }
    }

    @objc func storeCredentials(_ call: CAPPluginCall) {
        guard let username = call.getString("username"), let trustedToken = call.getString("trustedToken") else {
            call.reject("Username or trustedToken not provided")
            return
        }

        let saved = keychainWrapper.save(username: username, trustedToken: trustedToken)
        if saved {
            call.resolve()
        } else {
            call.reject("Failed to store credentials")
        }
    }

    @objc func retrieveCredentials(_ call: CAPPluginCall) {
        guard let credentials = keychainWrapper.retrieveCredentials() else {
            call.reject("Failed to retrieve credentials")
            return
        }

        call.resolve([
            "username": credentials.username,
            "trustedToken": credentials.trustedToken
        ])
    }
}
