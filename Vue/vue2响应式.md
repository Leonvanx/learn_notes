‘要讲清楚响应式原理，必须要先搞清楚Vue源码中`Observer` `Watcher` `Dep`3个类具体的作用、以及他们之间的关系。

如果我们把这3个类的关系、连接讲清楚了，那么响应式的大概原理也就明白了。

`Observer`，其主要作用是**对数据进行深度监听、劫持**，使得每次取值、设值都能监听到，从而执行一些自定义的方法。

`Wathcer`，`watch`被 `Observer` 处理过的数据，负责**渲染视图和更新视图的**，在响应式里的它是一个`渲染Watcher`。

Dep，是**记录**`渲染Watcher`,和**通知**`渲染Wathcer`去更新视图的。如果不记录，数据更改后，Dep不知道要通知谁。

### 数据观察者 Observer

我们从响应式的入口，`Observer`开始讲起。

**如果你传入的data是一个对象**，那么`Observer`会对你的这个对象的每一个key值进行`defineReactive`，其实也就是对`data`进行深度递归，把`data`转化为`getter`和`setter`的形式，底层也就是`Object.defineProperty`

**那么在getter和setter会做一些什么呢？**

##### Getter

Observer会给每一个属性，new一个Dep实例来进行管理属性依赖情况，当你对这个data(Object)取值时(也就是触发get时)，**Dep实例会（调用dep.depend方法）把当前渲染Watcher记住**。

##### Setter

当你对这个data(Object)进行设值时（也就是触发了set方法），需要更新模板了，就让**dep通知之前记住的watcher去更新**（调用dep.notify）

到这里，我们大概知道了Observer、Dep、Watcher的关系。

![图片](https://mmbiz.qpic.cn/mmbiz/yphVQAwjncs5huUMUQV8UkmvcAXorJ2cz0p5KT9xvjAmJgg7kbRicDFRlvaRGVMjBJqLDP6dZp6bavicic1oueA9Q/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 简单来说，就是**Observer进行数据劫持**、**Watcher更新视图**，而**Dep是Observer和Watcher的桥梁**，记录了数据的更改由哪个Watcher更新。

带着上面的总结，继续聊聊Observer。

上面我们说到，如果data是一个Object，就defineReactive，使用`Object.defineProperty`来劫持。

**那么如果data是一个数组呢？**

实际上在响应式里，**对数组的处理，是调用了另外一套机制---重写Array原型方法。**

总得来说就是，你在调用数组方法的时候，比如push，会先调用自己定义的push，再执行原生Array的push方法。

实现细节就是：

1、先拷贝数组的原型

```js
let arrayMethods = Object.create(Array.prototype)
复制代码
```

2、接着在自己创建的原型对象中，重写7个会改变数组本身的方法

```js
// 这七个方法都可以改变原数组
let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice' 
]
methods.forEach(method=>{
    arrayMethods[method] = function (...args) {
      // 然后当你调用methods里的方法的时候，进行对数据observe
      
      // 然后再调用原生数组的方法
      Array.prototype[method].apply(this,args);
    }
})
```

3、最后更改数据的原型链

```js
data.__proto__ = arrayMethods;
```

那么，当你执行`data.push`的时候，就会先执行`arrayMethods`里面的push，最后在arrayMethods里面，处理完自己的逻辑，再调用Array.push即可达到改写原生Array的效果。

因为这个机制，使得不用循环遍历数组的每一项进行观察，也是因为这个机制导致了直接调用数组的下标无法更新视图，需要调用set方法。

### 依赖数据调度中心 Dep

在说`Observer`的时候，我们说过在获取数据的时候，会调用`dep.depend`进行依赖收集，其实就是**把对应的Watcher push到subs数组中。**

有了这个数组后，如果你在对一个属性设置，那么就调用dep.notify，其实就是把subs里的每一个watcher去执行更新。

>dep 和 watcher 是多对多的关系
>
>每个属性 都有一个dep属性 ，dep 存放着watcher .
>
>---dep中可以有多个watcher ，因为一个watcher可能被多个属性所依赖

### 订阅者 Watcher

dep里面的subs数组里，存放的watcher是渲染Watcher，其作用就是渲染、更新视图。

当调用dep.notify的时候，会对这个属性所有的watcher调用update方法。

update方法的作用，就是去更新视图，这里为了节约性能会使用nextTick优化，类似一个防抖。

整个大概就是流程就是：

调用update之后，用nextTick优化。再调用更新的回调函数。

这个更新回调函数，生成新的render函数，render就会产生新的Vnode，vnode生成真实dom渲染视图。

至此就完成了数据更改到模板更新的过程。