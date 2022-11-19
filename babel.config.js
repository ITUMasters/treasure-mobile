module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: "./assets",
            consts: "./consts",
            icons: "./icons",
            components: './components',
            hooks: "./hooks",
            ui: './ui',
            theme: './theme',
            utils: './utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
      '@babel/plugin-proposal-export-namespace-from',
    ]
  };
};
