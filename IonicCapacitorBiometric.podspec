Pod::Spec.new do |s|
    s.name = 'IonicCapacitorBiometric'
    s.version = package['version']
    s.summary = package['description']
    s.license = package['license']
    s.homepage = package['repository']['url']
    s.author = package['author']
    s.source = { :git => 'https://github.com/ivankoop/ionic-capacitor-biometric', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '13.0'
    s.dependency 'Capacitor'
  end