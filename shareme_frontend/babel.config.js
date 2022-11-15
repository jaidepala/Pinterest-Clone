module.exports = {
    plugins: [
      ['@babel/plugin-transform-modules-commonjs', {allowTopLevelThis: true}],
    //   require.resolve('./scripts/babel-plugin-jest-require-outside-vm'),
    ],
    presets: [[
        '@babel/preset-env', {
            bugfixes: true,
            // we manually include the CJS plugin above, so let's make preset-env do less work
            modules: false,
            shippedProposals: true,
            targets: { node: 'current' }
        }]
    ],
};