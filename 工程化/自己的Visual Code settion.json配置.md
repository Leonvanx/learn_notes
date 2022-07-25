```js
{
  "workbench.colorTheme": "Monokai",
  "workbench.iconTheme": "material-icon-theme",
  "liveServer.settings.donotVerifyTags": true,
  "explorer.compactFolders": false,

  //gitlens扩展配置
  "gitlens.hovers.currentLine.over": "line",
  "gitlens.codeLens.scopes": ["document", "containers"],

  //编辑器配置
  "editor.formatOnSave": true,
  "editor.formatOnType": true,

  //各类型文件format配置
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "johnsoncodehk.volar"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.associations": {
    ".env.staging": "env"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  //stylelint扩展配置
  "stylelint.validate": ["css", "less", "scss"],
  "[css]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  // "[css]": {
  //   "editor.defaultFormatter": "esbenp.prettier-vscode"
  // },

  //eslint扩展配置
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.alwaysShowStatus": true,
  "eslint.run": "onSave",
  "eslint.format.enable": true,

  "javascript.updateImportsOnFileMove.enabled": "never",
  "maven.excludedFolders": [
    "**/.*",
    "**/node_modules",
    "**/target",
    "**/bin",
    "**/archetype-resources"
  ],
  "java.completion.importOrder": ["java", "javax", "com", "org"],
  "maven.executable.path": "/opt/homebrew/Cellar/maven@3.5/3.5.4_1/bin/mvn",
  "java.configuration.maven.userSettings": "/opt/homebrew/Cellar/maven@3.5/3.5.4_1/libexec/conf/settings.xml",
  "redhat.telemetry.enabled": true
}
```

遇到不能格式化.tsx代码的问题，没有增加以下配置：

 ```js
 "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
 }
 ```