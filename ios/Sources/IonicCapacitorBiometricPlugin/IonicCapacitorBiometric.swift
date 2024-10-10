//
//  IonicCapacitorBiometric.swift
//  App
//
//  Created by ivan koop on 2024-02-16.
//

import Foundation
import LocalAuthentication

@objc public class IonicCapacitorBiometric: NSObject {
    private let keychainWrapper = KeychainWrapper(service: "IonicCapacitorBiometricService")

    @objc public func requestBiometricPermissions(completion: @escaping (NSNumber, String?) -> Void) {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: "Biometric permission is required for secure access.") { success, authenticationError in
                DispatchQueue.main.async {
                    if success {
                        completion(NSNumber(value: true), nil)
                    } else {
                        completion(NSNumber(value: false), "Failed to request biometric permissions")
                    }
                }
            }
        } else {
            let reason = error?.localizedDescription ?? "Biometrics not available or not enrolled."
            completion(NSNumber(value: false), reason)
        }
    }

    @objc public func authenticate(completion: @escaping (NSNumber, String?) -> Void) {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: "Authenticate using biometrics") { success, authenticationError in
                DispatchQueue.main.async {
                    if success {
                        completion(NSNumber(value: true), nil)
                    } else {
                        let errorMessage = authenticationError?.localizedDescription ?? "Biometric authentication failed"
                        completion(NSNumber(value: false), errorMessage)
                    }
                }
            }
        } else {
            let errorMessage = error?.localizedDescription ?? "Biometrics not available or not enrolled."
            completion(NSNumber(value: false), errorMessage)
        }
    }

    @objc public func storeCredentials(username: String, trustedToken: String) -> Bool {
        return keychainWrapper.save(username: username, trustedToken: trustedToken)
    }

    @objc public func retrieveCredentials() -> [String: String]? {
        guard let credentials = keychainWrapper.retrieveCredentials() else {
            return nil
        }
        
        return ["username": credentials.username, "trustedToken": credentials.trustedToken]
    }
}
