//
//  BiometricAuthenticationManager.swift
//  Sources
//
//  Created by ivan koop on 2024-10-03.
//

import Foundation
import LocalAuthentication

class BiometricAuthenticationManager {
    
    func authenticateUser(completion: @escaping (Bool, Error?) -> Void) {
        let context = LAContext()
        var error: NSError?
        
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            let reason = "Identify yourself!"
            
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) {
                success, authenticationError in
                
                DispatchQueue.main.async {
                    completion(success, authenticationError)
                }
            }
        } else {
            // No biometrics available, or there was an error
            DispatchQueue.main.async {
                completion(false, error)
            }
        }
    }
}
