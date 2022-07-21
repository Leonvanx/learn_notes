

首先引入了[webpack](https://so.csdn.net/so/search?q=webpack&spm=1001.2101.3001.7020)-bundle-analyzer 这个插件来分析一下构建产物的组成

```js
/* craco.config.js */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); 
module.exports = {
    webpack: {
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8888,
                openAnalyzer: true, // 构建完打开浏览器
                reportFilename: path.resolve(__dirname, `analyzer/index.html`), 
            }),
        ],
    }
}
```

在使用`npm run  build`命令打包后，就可以得到一个分析图，包含了每个chunk的组成部分。

在craco中可以通过configure属性拿到webpack的配置对象，对其进行修改来配置，将重复的包拆分出去。

```js
webpack: {
    plugins: [/** */],
    configure: (webpackConfig, { env: webpackEnv, paths }) => {
            webpackConfig.optimization.splitChunks = {
                ...webpackConfig.optimization.splitChunks,
                cacheGroups: {
                    base: {
                        // 基本框架
                        chunks: 'all',
                        test: /(react|react-dom|react-dom-router)/,
                        name: 'base',
                        priority: 100,
                    },
                    jsoneditor: {
                        test: /jsoneditor/,
                        name: 'jsoneditor',
                        priority: 100,
                    },
                    echarts: {
                        test: /(echarts)/,
                        name: 'echarts',
                        priority: 100,
                    },
                    g2: {
                        test: /@antv/,
                        name: 'g2',
                        priority: 100,
                    },
                    commons: {
                        chunks: 'all',
                        // 将两个以上的chunk所共享的模块打包至commons组。
                        minChunks: 2,
                        name: 'commons',
                        priority: 80,
                    },
                },
            };
            return webpackConfig;
        },
}
```

按需加载大体积的库。

babel-plugin-import这个插件原本是用来给antd按需引入的，但在这里我们也能用于其他的库

```js
babel: {
    plugins: [
        [
        'import', 
        { libraryName: 'bizcharts', libraryDirectory: 'lib/components' },
        ],
    ],
}
```

附上完整配置：

```js
// craco.config.js

const path = require('path');
const CracoLessPlugin = require('craco-less');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const env = process.env.REACT_APP_ENV;
module.exports = {
    webpack: {
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: env !== 'development' ? 'server' : 'disabled',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8888,
                openAnalyzer: true,
                reportFilename: path.resolve(__dirname, `analyzer/index.html`),
            }),
            new WebpackBar({
                profile: true,
                color: '#fa8c16',
            }),
            new HardSourceWebpackPlugin(),
        ],
        alias: {
            layouts: path.resolve(__dirname, './src/app/layouts'),
            containers: path.resolve(__dirname, './src/app/containers'),
            components: path.resolve(__dirname, './src/app/components'),
            utils: path.resolve(__dirname, './src/utils'),
            routers: path.resolve(__dirname, './src/routers'),
        },
        configure: (webpackConfig, { env: webpackEnv, paths }) => {
            webpackConfig.externals = {
                'ckeditor5-custom-build': 'ClassicEditor',
            };
            webpackConfig.optimization.splitChunks = {
                ...webpackConfig.optimization.splitChunks,
                cacheGroups: {
                    base: {
                        // 基本框架
                        chunks: 'all',
                        test: /(react|react-dom|react-dom-router)/,
                        name: 'base',
                        priority: 100,
                    },
                    jsoneditor: {
                        test: /jsoneditor/,
                        name: 'jsoneditor',
                        priority: 100,
                    },
                    echarts: {
                        test: /(echarts)/,
                        name: 'echarts',
                        priority: 100,
                    },
                    g2: {
                        test: /@antv/,
                        name: 'g2',
                        priority: 100,
                    },
                    commons: {
                        chunks: 'all',
                        // 将两个以上的chunk所共享的模块打包至commons组。
                        minChunks: 2,
                        name: 'commons',
                        priority: 80,
                    },
                },
            };
            return webpackConfig;
        },
    },
   
    babel: {
        plugins: [
            [   // antd 的按需加载用和自动引入样式文件
                'import',
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                },
            ],
            // bizcharts的按需加载
            ['import', { libraryName: 'bizcharts', libraryDirectory: 'lib/components' }, 'biz'],
        ],
    },
    plugins: [
        {   // 修改antd主题
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        math: 'always',
                        modifyVars: {
                            '@primary-color': '#1890ff', //主题颜色
                        }, 
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
```

