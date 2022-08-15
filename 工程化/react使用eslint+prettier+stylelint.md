eslint配置：

```js
export default {
  root: true,
  // 环境，这里可以设置环来做区别判断
  env: {
    browser: true,
    es6: true
  },
  // 使用的扩展库
  extends: ['airbnb', 'standard-react', 'plugin:prettier/recommended'],
  // 解析器用于解析代码
  parser: '@typescript-eslint/parser',
  // 解析器配置
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 5,
    sourceType: 'module'
  },
  // 可以全局使用变量
  globals: {
    Babel: true,
    React: true,
    PATH_ENV: true
  },
  // 第三方插件
  plugins: ['react', '@typescript-eslint/eslint-plugin'],
  // 规则配置
  rules: {
    semi: 0,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
      }
    ],
    'no-useless-escape': 2,
    'no-tabs': 'off'
  }
};
```

prettier配置：

```js
// prettier.config.js or .prettierrc.js
module.exports = {
  // 一行最多 120 字符
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
};
```

stylelint配置：

```js
{
  "extends": ["stylelint-config-standard", "stylelint-config-prettier"],
  "rules": {
    "selector-class-pattern": null
  }
}
```

记录配置过程中遇到的一个坑：

eslint配置中有 `ignores` 和 `files` 两个选项，选项具体功能见[官方文档](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new)，这两个新配置是试验性特性，用于 `FlatESLint`，曾把 `ignores` 配置项当作 ``ignorePatterns`来用，导致报错。

`eslint` 命令行参数：

```js
eslint [options] file.js [file.js] [dir]

Basic configuration:
  --no-eslintrc                  Disable use of configuration from .eslintrc.*
  -c, --config path::String      Use this configuration, overriding .eslintrc.* config options if present
  --env [String]                 Specify environments
  --ext [String]                 Specify JavaScript file extensions - default: .js
  --global [String]              Define global variables
  --parser String                Specify the parser to be used
  --parser-options Object        Specify parser options
  --resolve-plugins-relative-to path::String  A folder where plugins should be resolved from, CWD by default

Specifying rules and plugins:
  --rulesdir [path::String]      Use additional rules from this directory
  --plugin [String]              Specify plugins
  --rule Object                  Specify rules

Fixing problems:
  --fix                          Automatically fix problems
  --fix-dry-run                  Automatically fix problems without saving the changes to the file system
  --fix-type Array               Specify the types of fixes to apply (problem, suggestion, layout)

Ignoring files:
  --ignore-path path::String     Specify path of ignore file
  --no-ignore                    Disable use of ignore files and patterns
  --ignore-pattern [String]      Pattern of files to ignore (in addition to those in .eslintignore)

Using stdin:
  --stdin                        Lint code provided on <STDIN> - default: false
  --stdin-filename String        Specify filename to process STDIN as

Handling warnings:
  --quiet                        Report errors only - default: false
  --max-warnings Int             Number of warnings to trigger nonzero exit code - default: -1

Output:
  -o, --output-file path::String  Specify file to write report to
  -f, --format String            Use a specific output format - default: stylish
  --color, --no-color            Force enabling/disabling of color

Inline configuration comments:
  --no-inline-config             Prevent comments from changing config or rules
  --report-unused-disable-directives  Adds reported errors for unused eslint-disable directives

Caching:
  --cache                        Only check changed files - default: false
  --cache-file path::String      Path to the cache file. Deprecated: use --cache-location - default: .eslintcache
  --cache-location path::String  Path to the cache file or directory

Miscellaneous:
  --init                         Run config initialization wizard - default: false
  --debug                        Output debugging information
  -h, --help                     Show help
  -v, --version                  Output the version number
  --print-config path::String    Print the configuration for the given file
```

详细参数见[官方文档](https://eslint.cn/docs/user-guide/command-line-interface)
