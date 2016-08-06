var webpackConfig = require('./webpack.config');

webpackConfig.module.preLoaders = [
  // instrument only testing sources with Istanbul
  {
    test: /\.ts$/,
    loader: 'istanbul-instrumenter!ts'
  }
];

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      'src/**/*.test.js'
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.ts': ['coverage'],
      'src/**/*.test.js': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ['progress','coverage'],
    coverageReporter: {
      reporters:[
        {type: 'lcov',dir: 'coverage',subdir: 'reports'},
        {type: 'json',dir: 'coverage',subdir: 'reports'}
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
