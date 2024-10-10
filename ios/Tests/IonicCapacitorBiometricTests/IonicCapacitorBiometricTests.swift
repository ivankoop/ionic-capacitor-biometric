//
//  IonicCapacitorBiometricTests.swift
//  Tests
//
//  Created by ivan koop on 2024-10-03.
//

import XCTest
@testable import IonicCapacitorBiometricPlugin

class IonicCapacitorBiometricTests: XCTestCase {

    let plugin = IonicCapacitorBiometricPlugin()

    func testRequestBiometricPermissions() {
        let call = CAPPluginCall(callbackId: "test", options: [:], success: { response in
            XCTAssert(true, "Biometric permission granted successfully")
        }, error: { error in
            XCTFail("Failed to request biometric permissions: \(error.localizedDescription)")
        })
        plugin.requestBiometricPermissions(call!)
    }

    func testAuthenticate() {
        let call = CAPPluginCall(callbackId: "test", options: [:], success: { response in
            XCTAssert(true, "Biometric authentication succeeded")
        }, error: { error in
            XCTFail("Biometric authentication failed: \(error.localizedDescription)")
        })
        plugin.authenticate(call!)
    }

    func testStoreCredentials() {
        let call = CAPPluginCall(callbackId: "test", options: ["username": "testUser", "trustedToken": "testToken"], success: { response in
            XCTAssert(true, "Credentials stored successfully")
        }, error: { error in
            XCTFail("Failed to store credentials: \(error.localizedDescription)")
        })
        plugin.storeCredentials(call!)
    }

    func testRetrieveCredentials() {
        let call = CAPPluginCall(callbackId: "test", options: [:], success: { response in
            guard let username = response?.data["username"] as? String, let trustedToken = response?.data["trustedToken"] as? String else {
                XCTFail("Failed to retrieve credentials data from the response")
                return
            }
            XCTAssertEqual(username, "testUser", "Retrieved username should match the stored value")
            XCTAssertEqual(trustedToken, "testToken", "Retrieved trusted token should match the stored value")
        }, error: { error in
            XCTFail("Failed to retrieve credentials: \(error.localizedDescription)")
        })
        plugin.retrieveCredentials(call!)
    }
}
