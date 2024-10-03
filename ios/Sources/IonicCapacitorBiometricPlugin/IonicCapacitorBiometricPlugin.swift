import Foundation
import Capacitor


@objc(IonicCapacitorBiometricPlugin)
public class IonicCapacitorBiometricPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "IonicCapacitorBiometricPlugin"
    public let jsName = "IonicCapacitorBiometric"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = IonicCapacitorBiometric()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}
