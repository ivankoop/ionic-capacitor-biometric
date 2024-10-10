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
        CAPPluginMethod(name: "requestBiometricPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "authenticate", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "storeCredentials", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "retrieveCredentials", returnType: CAPPluginReturnPromise)
    ]

    private let implementation = IonicCapacitorBiometric()

    @objc func requestBiometricPermissions(_ call: CAPPluginCall) {
        implementation.requestBiometricPermissions { success, error in
            if success.boolValue {
                call.resolve()
            } else {
                call.reject(error ?? "Unknown error requesting biometric permissions")
            }
        }
    }

    @objc func authenticate(_ call: CAPPluginCall) {
        implementation.authenticate { success, error in
            if success.boolValue {
                call.resolve()
            } else {
                call.reject(error ?? "Unknown error during authentication")
            }
        }
    }

    @objc func storeCredentials(_ call: CAPPluginCall) {
        guard let username = call.getString("username"), let trustedToken = call.getString("trustedToken") else {
            call.reject("Username or trustedToken not provided")
            return
        }

        let saved = implementation.storeCredentials(username: username, trustedToken: trustedToken)
        if saved {
            call.resolve()
        } else {
            call.reject("Failed to store credentials")
        }
    }

    @objc func retrieveCredentials(_ call: CAPPluginCall) {
        guard let credentials = implementation.retrieveCredentials() else {
            call.reject("Failed to retrieve credentials")
            return
        }

        call.resolve([
            "username": credentials["username"] ?? "",
            "trustedToken": credentials["trustedToken"] ?? ""
        ])
    }
}
