module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    [
      'module-resolver',
      {
        alias: {
          '@modules': ['./src/modules'],
          '@config': ['./src/config'],
          '@shared': ['./src/shared'],
          '@errors': ['./src/errors'],
          '@utils': ['./src/utils'],
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
