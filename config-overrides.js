const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const path = require('path')
const { override, useEslintRc, fixBabelImports } = require('customize-cra')


module.exports = override(
    useEslintRc(path.resolve(__dirname, '.eslintrc')),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    (config, env) => {
        config = rewireReactHotLoader(config, env)
        return config
    }
)

// module.exports = function override(config, env) {
//     config = rewireEslint(config, env)
//     if (env === 'development') {
//         config.resolve.alias['react-dom'] = '@hot-loader/react-dom'
//     }
//     config.plugins.push(
//         new webpack.EnvironmentPlugin({
//             LATER_COV: false // fixes problem with later.js and prettycron
//         })
//     )
//     config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(
//         __dirname,
//         './src/images/icons.js'
//     )
//     config = rewireReactHotLoader(config, env)
//     return config
// }
