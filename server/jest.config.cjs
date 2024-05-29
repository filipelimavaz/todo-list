module.exports = {
    testEnvironment: 'node',
    testMatch: [ '**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)' ],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};
