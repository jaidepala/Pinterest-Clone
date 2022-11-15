const config = {
    collectCoverage: false,
    globals: {
        window: {
            gapi: {}
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
    // testEnvironment: 'jest-environment-node',
    transform: {},
    transform: {
        // '.jsx': 'babel-jest',
        // '.js': 'babel-jest',
        '\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/gapi-script/index.js',
        'node_modules[/\\\\](?!@gapi-script[/\\\\]gapi-script)',
        'node_modules/(?!(gapi-script|gapi)/)',
        '[/\\\\]node_modules[/\\\\](?!(@gapi)\\/).+\\.(js|jsx|ts|tsx)$'
    ]
};

module.exports = config;