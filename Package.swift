// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "IonicCapacitorBiometric",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "IonicCapacitorBiometric",
            targets: ["IonicCapacitorBiometricPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "IonicCapacitorBiometricPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/IonicCapacitorBiometricPlugin"),
        .testTarget(
            name: "IonicCapacitorBiometricTests",
            dependencies: ["IonicCapacitorBiometricPlugin"],
            path: "ios/Tests/IonicCapacitorBiometricTests")
    ]
)