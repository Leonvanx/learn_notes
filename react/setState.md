## 1. 为什么使用setState？

在日常开发过程中，如果直接修改state的值，并不会触发界面的更新，因为React并没有实现类似于Vue2中的`Object.defineProperty` 或者Vue3中的`Proxy` 方式来坚听数据的变化。也就导致直接修改数据，React并不知道你修改了它。所以才使用 `setState`方法来告知React我更新了数据。

## 2.setState是同步的还是异步的？

从Vue转过来的同学在学习React的过程中，在使用`setState`来修改数据后，习惯性的`console.log`一下来打印修改后的数据，结果发现打印出来的依旧是原来的值。原因就是因为`setState`在大多数情况下是异步执行的。

1. 为什么是异步的？

设计成异步更新可以显著提高性能，如果每`setState`一次就进行一次`render`，不仅会造成渲染堵塞，效率也是最低的。

2. 怎样才能打印出修改后的`state`值？

利用`setState`函数的第二个参数，该参数传入一个回调方法，在更新完`state`值后执行该方法。

```js
changeState(){
  this.setState({text:'修改后的值'},()=>{
    console.log(this.state.text)
  })
}
```

3. `setState`一定是异步执行的吗？

不是，在`setTimeout`或者原生Dom事件中执行时，是同步的。

4. 多次调用`setState`。

当我们多次调用`setState`后，只会生效最后一次的更新，想要全部生效，给`setState`传递函数，使用上一次`state`的值。

```js
this.setState((preState,props)=>{
  return {count:preState+=1}
})
this.setState((preState,props)=>{
  return {count:preState+=1}
})
this.setState((preState,props)=>{
  return {count:preState+=1}
})
```



