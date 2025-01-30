  module.exports = {
    default: {
      require: [
        './features/step-definitions/*.js'
      ],
      format: ['progress', 'json:report/cucumber_report.json']
    }
  };