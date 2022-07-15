

Pinia是一个全新的Vue状态管理库，是Vuex的代替者。

# 优势

1. Vue2 和 Vue3 都能支持
2. 抛弃传统的 `Mutation` ，只有 `state, getter` 和 `action` ，简化状态管理库
3. 不需要嵌套模块，符合 Vue3 的 Composition api，让代码扁平化
4. TypeScript支持
5. 代码简介，很好的代码自动分割

# Defining a Store

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

## Using the store

```vue
<template>
    <div>{{ userStore.count }}</div>
</template>
<script lang="ts" setup>
import { userStore } from '../store'
const userStore = userStore()
// 解构
// const { count } = userStore()
return{
  userStore,
  //count
}
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

## 修改State状态

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
      items:[]
    }
  },
})
```

通常，你可以通过store实例进行直接获取和修改state数据。

```js
const store = useStore();
store.counter++
```

可以使用 `store.$reset()` 进行重置state的数据回复到初始值。

```js
const store = useStore()
store.$reset()
```

你还可以通过使用pinia的内置API即 `$patch()` 进行更新，它允许你在同一时间进行多个数据的改变。`$patch() ` 允许你去组合多个改变的值，可以像数组进行增删改查。

```js
const store = useStore()
store.$patch({
  counter: store.counter + 1,
  age: 120,
  name: 'DIO',
})
```

还能够传入函数去组合多个state状态的改变

```js
const store = useStore();
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

## getters

具有缓存功能，当在页面里多次使用时，在数据没有改变的情况下第一次调用之后都会读取缓存。

```vue
<template>
    <div>{{ doubleCount }}</div>
    <div>{{ doubleCount }}</div>
    <div>{{ doubleCount }}</div>
</template>
```

```typescript

import {defineStore} from "pinia"

export const useNumerStore = defineStore("numer",{
  state:()=>({
    counter:0,
  }),
  getters:{
    doubleCount(state){
      return state.counter * 2
    },
    // 当使用this的时候，必须准确地设置返回值的类型
    doublePlusOne():number{
      return this.counter * 2 + 1
    }
  }
})
```

## Actions

Actions are the equivalent of [methods](https://v3.vuejs.org/guide/data-methods.html#methods) in components. They can be defined with the `actions` property in `defineStore()` and **they are perfect to define business logic**:

```js
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})
```

- 相同点：actions和getters都可以全类型支持来访问整个store实例。
- 不同点：actions操作可以是异步的，可以在其中等待任何api调用甚至其他操作。

```js
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // let the form component display the error
        return error
      }
    },
  },
})
```

也可以在action 里调用其他 store 里的 action，引入对应的 store 后即可访问其内部的方法了。

```js
import { useAppStore } from './app'
export const useUserStore = defineStore({
  id: 'user',
  actions: {
    async login(account, pwd) {
      const { data } = await api.login(account, pwd)
      const appStore = useAppStore()
      appStore.setData(data) // 调用 app store 里的 action 方法
      return data
    }
  }
})
```

