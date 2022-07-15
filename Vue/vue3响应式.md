# Proxy

```js
const obj = {
  count: 1
};
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("这里是get");
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("这里是set");
    return Reflect.set(target, key, value, receiver);
  }
});

console.log(proxy)
console.log(proxy.count)
```

通过以上Proxy配合Reflect的代码就能实现对对象的拦截

![](https://cdn.jsdelivr.net/gh/Leonvanx/picgo-repo/image/202207131428402.png)

但是当对象再嵌套一层级时，就会发现无法拦截了。我们来优化下代码

```js
const obj = {
  a: {
    count: 1
  }
};

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log("这里是get");
      // 判断如果是个对象在包装一次，实现深层嵌套的响应式
      if (typeof target[key] === "object") {
        return reactive(target[key]);
      };
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log("这里是set");
      return Reflect.set(target, key, value, receiver);
    }
  });
};
const proxy = reactive(obj);
```

