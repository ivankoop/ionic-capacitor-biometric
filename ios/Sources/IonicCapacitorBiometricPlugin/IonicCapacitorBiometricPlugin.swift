//
//  IonicCapacitorBiometricPlugin.swift
//  App
//
//  Created by ivan koop on 2024-02-16.
//


import Foundation
import Capacitor

@objc(IonicCapacitorBiometricPlugin)
public class IonicCapacitorBiometricPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "IonicCapacitorBiometricPlugin"
    public let jsName = "IonicCapacitorBiometric"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isAvailable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestBiometricPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "authenticate", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "storeCredentials", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "retrieveCredentials", returnType: CAPPluginReturnPromise)
    ]

    private let implementation = IonicCapacitorBiometric()

    @objc func isAvailable(_ call: CAPPluginCall) {
        implementation.isAvailable { success, error in
            if success.boolValue {
                call.resolve(["message": "Biometric authentication is available"])
            } else {
                call.reject("Biometric authentication is not available")
            }
        }
    }

    @objc func requestBiometricPermissions(_ call: CAPPluginCall) {
        implementation.requestBiometricPermissions { success, error in
            if success.boolValue {
                call.resolve(["message": "Biometric permissions granted"])
            } else {
                call.reject(error ?? "Unknown error requesting biometric permissions")
            }
        }
    }

    @objc func authenticate(_ call: CAPPluginCall) {
        implementation.authenticate { success, error in
            if success.boolValue {
                call.resolve(["message": "Authentication successful"])
            } else {
                call.reject(error ?? "Unknown error during authentication")
            }
        }
    }

    @objc func storeCredentials(_ call: CAPPluginCall) {
        guard let username = call.getString("username"),
              let trustedToken = call.getString("trustedToken") else {
            call.reject("Username or trustedToken not provided")
            return
        }

        let saved = implementation.storeCredentials(username: username, trustedToken: trustedToken)
        if saved {
            call.resolve(["message": "Credentials stored successfully"])
        } else {
            call.reject("Failed to store credentials")
        }
    }

    @objc func retrieveCredentials(_ call: CAPPluginCall) {
        guard let credentials = implementation.retrieveCredentials(),
              let username = credentials["username"],
              let trustedToken = credentials["trustedToken"] else {
            call.reject("Failed to retrieve credentials")
            return
        }

        call.resolve(["message": "Credentials retrieved successfully", "username": username, "trustedToken": trustedToken])
    }
}