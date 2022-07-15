# 一个自定义的vue3的Hooks🌰

```typescript
import { ref } from '/@modules/vue'
import  useCount from './useCount'

export default {
  name: 'CountDemo',
  props: {
    msg: String
  },
  setup() {
    const { current: count, inc, dec, set, reset } = useCount(2, {
      min: 1,
      max: 15
    })
    const msg = ref('Demo useCount')

    return {
      count,
      inc,
      dec,
      set,
      reset,
      msg
    }
  }
}

```

效果如下：

![](https://cdn.jsdelivr.net/gh/Leonvanx/picgo-repo/image/202206151449784.webp)

以下是`useCount`的源码：

```typescript
import { ref, Ref, watch } from 'vue'

interface Range {
  min?: number,
  max?: number
}
  
interface Result {
  current: Ref<number>,
  inc: (delta?: number) => void,
  dec: (delta?: number) => void,
  set: (value: number) => void,
  reset: () => void
}

export default function useCount(initialVal: number, range?: Range): Result {
  const current = ref(initialVal)
  const inc = (delta?: number): void => {
    if (typeof delta === 'number') {
      current.value += delta
    } else {
      current.value += 1
    }
  }
  const dec = (delta?: number): void => {
    if (typeof delta === 'number') {
      current.value -= delta
    } else {
      current.value -= 1
    }
  }
  const set = (value: number): void => {
    current.value = value
  }
  const reset = () => {
    current.value = initialVal
  }
  
  watch(current, (newVal: number, oldVal: number) => {
    if (newVal === oldVal) return
    if (range && range.min && newVal < range.min) {
      current.value = range.min
    } else if (range && range.max && newVal > range.max) {
      current.value = range.max
    }
  })

  return {
    current,
    inc,
    dec,
    set,
    reset
  }
}
```

`TIPS`

------

* 在增加 `inc` 和减少 `dec` 的两个函数中增加了 `typeof` 类型守卫检查，因为传入的 `delta` 类型值在某些特定场景下不是很确定，比如在 `template` 中调用方法的话，类型检查可能会失效，传入的类型就是一个原生的 `Event` 。
* 关于 `ref` 类型值，这里并没有特别声明类型，因为 `vue3` 会进行自动类型推导，但如果是复杂类型的话可以采用类型断言的方式： `ref(initObj) as Ref<ObjType>` 