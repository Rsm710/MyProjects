
  module.exports = {
    name: "COVV",
    slug: "covv",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra:{
      eas:{
        projectId:"be961f79-2b05-411e-8768-c205146f1ddc"
      }
    },
    updates:{
      url:"https://u.expo.dev/f5a006cb-74c9-4479-9720-e2ff9b23f5a6"
    },
    runtimeVersion:{
      policy:"appVersion"
    },
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#05123B"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      buildNumber:"23",
      bundleIdentifier:"com.hellocharges",
      infoPlist:{
        UIBackgroundModes:["fetch","remote-notification"],
        LSMinimumSystemVersion:12.0
      },
      supportsTablet: true
    },
    android: {
      "package": "com.anonymous.helloChargers",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
      "expo-location",
      {
          "locationWhenInUsePermission": "Allow $(PRODUCT_NAME) To help you find the nearest bars, we need permission to use your location. This allows us to show you the best options nearby. Rest assured, your location data will only be used for this purpose and will not be shared with third parties.",
      }
    ],
    [
      "expo-secure-store",
    ],
    "expo-font",
  ],
    experiments: {
      typedRoutes: true
    }
    
  }
  

