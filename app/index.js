require('babel-polyfill');
require('babel-register')({
  'presets': [
    'es2015',
    'stage-2',
  ],
  'plugins': [
    'syntax-async-functions',
    'transform-regenerator'
  ]
});

require('./app');
