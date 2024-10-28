module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        'react-native-reanimated/plugin', // Asegúrate de incluir esto para que funcione correctamente
        [
          'module-resolver',
          {
            root: ['./src'], // Esto establece la raíz del módulo en la carpeta src
            alias: {
              assets: './assets', // Puedes agregar alias para acceder a la carpeta assets
            },
            extensions: ['.fbx', '.js', '.jsx', '.ts', '.tsx', '.json', '.png', '.jpg', '.glb', '.gltf'],
          },
        ],
      ],
    };
  };