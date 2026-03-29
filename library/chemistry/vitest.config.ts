const path = require('path');

module.exports = {
  test: {
    globals: true,
    environment: 'happy-dom',
    deps: {
      inline: [/chemistry/]
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  esbuild: {
    target: 'node14'
  }
}
