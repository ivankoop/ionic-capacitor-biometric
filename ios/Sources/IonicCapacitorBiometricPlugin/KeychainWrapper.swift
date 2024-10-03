//
//  KeychainWrapper.swift
//  App
//
//  Created by ivan koop on 2024-10-03.
//

import Foundation
import Security

class KeychainWrapper {
    private let service: String


    init(service: String = "IonicCapacitorBiometricService") {
        self.service = service
    }

    func save(username: String, trustedToken: String) -> Bool {
        let trustedTokenData = trustedToken.data(using: .utf8)!
        
   
        let deleteQuery: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
        ]
        SecItemDelete(deleteQuery as CFDictionary)

        // Create the query to add the item
        let addQuery: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: username,
            kSecValueData as String: trustedTokenData
        ]
        
        let status = SecItemAdd(addQuery as CFDictionary, nil)
        
        return status == errSecSuccess
    }

    func retrieveCredentials() -> (username: String, trustedToken: String)? {
        let getQuery: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecReturnAttributes as String: true,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        
        var item: CFTypeRef?
        let status = SecItemCopyMatching(getQuery as CFDictionary, &item)
        guard status == errSecSuccess, let existingItem = item as? [String: Any],
              let trustedTokenData = existingItem[kSecValueData as String] as? Data,
              let trustedToken = String(data: trustedTokenData, encoding: .utf8),
              let username = existingItem[kSecAttrAccount as String] as? String else {
            return nil
        }

        return (username: username, trustedToken: trustedToken)
    }
}
