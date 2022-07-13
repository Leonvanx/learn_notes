

Pinia是一个全新的Vue状态管理库，是Vuex的代替者。

# 优势

1. Vue2 和 Vue3 都能支持
2. 抛弃传统的 `Mutation` ，只有 `state, getter` 和 `action` ，简化状态管理库
3. 不需要嵌套模块，符合 Vue3 的 Composition api，让代码扁平化
4. TypeScript支持
5. 代码简介，很好的代码自动分割

# 基本使用

我们首先定义一个store。

```js
import { defineStore } from 'pinia'
export const userStore = defineStore('user', {
    state: () => {
        return { 
            count: 1,
            arr: []
        }
    },
    getters: { ... },
    actions: { ... }
})
```

`defineStore` 函数接收两个参数，第一个就是模块的名称，名称必须唯一。第二个参数是定义sotre的对象。

`state` 用来存储全局状态，必须为箭头函数。

`getters` 用来封装计算属性，具有缓存功能。

`actions` 用来封装对state操作的业务逻辑，可以是同步的和异步的。

## 访问state

```vue
<template>
    <div>{{ user_store.count }}</div>
</template>
<script lang="ts" setup>
import { userStore } from '../store'
const user_store = userStore()
// 解构
// const { count } = userStore()
</script>
```

> 使用如上方式解构出来的数据是能够支持使用的，但注意，该数据并不是**响应式**的。

如果需要保持数据的响应式，则需要使用 `storeToRefs()` 方法，示例如下：

```vue
<template>
    <div>{{ count }}</div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { userStore } from '../store'
const { count } = storeToRefs(userStore)
</script>
```

## getters

多次掉用也只会掉用一次getters，