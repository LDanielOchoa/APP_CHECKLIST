const { getDefaultConfig } = require('expo/metro-config');
module.exports = getDefaultConfig(__dirname);
module.exports = {
    resolver: {
      blacklistRE: /DebuggingOverlayNativeComponent/,
    },
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
  };
  