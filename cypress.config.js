require('dotenv').config();

const config = {
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 60_000,
    numTestsKeptInMemory: 0,
    env: {
        TEST_TOKEN: process.env.TEST_TOKEN,
        TEST_USERNAME: process.env.TEST_USERNAME,
        TEST_PASSWORD: process.env.TEST_PASSWORD,
        TEST_ID: process.env.TEST_ID,
        TEST_EMAIL: process.env.TEST_EMAIL,
        REACT_APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
    },
    e2e: {},
};

module.exports = config;
