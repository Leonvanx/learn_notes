

`esm` 是“EcmaScript module”的缩写。

`cjs` 是“CommonJS module”的缩写。

`umd` 是“Universal Module Definition”的缩写，它可以在 `<script>` 标签中执行、被 `CommonJS` 模块加载器加载、被 `AMD` 模块加载器加载。

`esm` 被认为是“未来”，但 `cjs` 仍然在社区和生态系统中占有重要地位。`esm` 对打包工具来说更容易正确地进行 treeshaking，因此对于库来说，拥有这种格式很重要。或许在将来的某一天，你的库只需要输出 `esm`。

[更多](https://mp.weixin.qq.com/s?__biz=MzI4OTY2MzE0OA==&mid=2247502455&idx=1&sn=410ccc8020a813d28f071823281fdb00&chksm=ec293bb4db5eb2a2b896002067ed4712a4ff42843b21f470b6d84549ec9e92db9c71d50096cd#rd)

https://juejin.cn/post/6844904114183208968#heading-8
https://juejin.cn/post/7205897684624474168#heading-0
https://juejin.cn/post/7053998924071174175#heading-12
https://juejin.cn/post/7054752322269741064/
https://juejin.cn/post/6959360326299025445#heading-9
https://juejin.cn/post/6959360215674257415#heading-11
https://zhuanlan.zhihu.com/p/148081795#:~:text=%E9%A2%9D%E5%A4%96%E7%BB%99%20module.exports%20%E5%A2%9E%E5%8A%A0%E4%B8%80%E4%B8%AA%20__esModule%3A%20true%20%E7%9A%84%E5%B1%9E%E6%80%A7%EF%BC%8C%E7%94%A8%E6%9D%A5%E5%91%8A%E8%AF%89%E7%BC%96%E8%AF%91%E5%99%A8%EF%BC%8C%E8%BF%99%E6%9C%AC%E6%9D%A5%E6%98%AF%E4%B8%80%E4%B8%AA%20esm,%E6%A8%A1%E5%9D%97%20TS%20%E5%BC%80%E5%90%AF%20esModuleInterop%20%E5%90%8E%E7%9A%84%E7%BC%96%E8%AF%91%E8%A7%84%E5%88%99%20%E5%9B%9E%E5%88%B0%E6%A0%87%E9%A2%98%E4%B8%8A%EF%BC%8CesModuleInterop%20%E8%BF%99%E4%B8%AA%E5%B1%9E%E6%80%A7%E9%BB%98%E8%AE%A4%E4%B8%BA%20false%E3%80%82
https://toyobayashi.github.io/2020/06/29/ESModule/
https://juejin.cn/post/7063002055308214302
https://juejin.cn/post/7124967210749001765#heading-0
https://juejin.cn/post/7137902538103193613#heading-3
https://juejin.cn/post/7138212982558818311#heading-0