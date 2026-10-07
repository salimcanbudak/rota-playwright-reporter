module.exports = {
  testDir: './specs', retries: 1, workers: 2,
  reporter: [['list'], ['../src/reporter.cjs', { outputFolder: 'integration-report' }]],
  projects: [{ name: 'Chromium' }, { name: 'Firefox' }, { name: 'WebKit' }],
};
