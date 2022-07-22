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