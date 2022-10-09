`esm` 是“EcmaScript module”的缩写。

`cjs` 是“CommonJS module”的缩写。

`umd` 是“Universal Module Definition”的缩写，它可以在 `<script>` 标签中执行、被 `CommonJS` 模块加载器加载、被 `AMD` 模块加载器加载。

`esm` 被认为是“未来”，但 `cjs` 仍然在社区和生态系统中占有重要地位。`esm` 对打包工具来说更容易正确地进行 treeshaking，因此对于库来说，拥有这种格式很重要。或许在将来的某一天，你的库只需要输出 `esm`。

[更多](https://mp.weixin.qq.com/s?__biz=MzI4OTY2MzE0OA==&mid=2247502455&idx=1&sn=410ccc8020a813d28f071823281fdb00&chksm=ec293bb4db5eb2a2b896002067ed4712a4ff42843b21f470b6d84549ec9e92db9c71d50096cd#rd)