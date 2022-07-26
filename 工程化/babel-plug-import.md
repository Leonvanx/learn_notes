```js
{
  "presets": [
    [
      "react-app",
      {
        "useBuiltIns": "usage",
        "corejs": 2,
        "targets": {
          "production": [">0.2%", "not dead", "not op_mini all"],
          "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
          ]
        }
      }
    ]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime"],
    [
      "import",
      {
        "libraryName": "@arco-design/web-react",
        "libraryDirectory": "es",
        "camel2DashComponentName": false,
        "style": true // 样式按需加载
      },
      "arco-design/web-react"
    ],
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      },
      "antd"
    ]
  ]
}

```

>  当需要处理两套不同的UI框架按需倒入时，需要给一个唯一别名，否则编译会报错。在上方代码中，分别设置为`arco-design/web-react` 和 `antd`

记一个小问题：

曾按照 [这篇文章](https://blog.csdn.net/m0_58016522/article/details/122067153) 来实现全局暗黑模式动态切换功能，大致原理是使用less编译antd的默认样式和暗黑模式的样式，配合antd的`ConfigProvider`全局化配置`prefixCls`的方式来修改ant design样式的`prefix`，即默认主题通过类名前缀`custom-default`来控制样式，而暗色主题通过类名前缀`custom-dark`来控制样式。期间就想当然的把webpack中less-loader对less样式文件的按需导入给注释掉了（以为不再需要了），然后就导致antd的message样式出现问题。