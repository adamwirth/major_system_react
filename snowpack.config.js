/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    // default settings for webpack here were unfortunately duplicating script output
    // which was ultimately breaking the code!
    // '@snowpack/plugin-webpack',
    // using just terser instead for now. might switch to rollup or webpack if i feel up to the bother
    'snowpack-plugin-terser',
  ],
  experiments: {
    optimize: {
      // bundle: true,
      // minify: true,
      // target: 'es2021',
      preload: true,
      manifest: true,
    },
  },
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
