# useMemo

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

传入“创建函数”和依赖项数组，返回一个[memoized](https://en.wikipedia.org/wiki/Memoization)值，只会在某个依赖项改变时才会重新计算momoized值。该hook有助于避免每次渲染时进行高开销的计算。

> useMemo与memo的理念上差不多，都是判断是否满足当前的限定条件来决定是否执行callback函数，而useMemo的第二个参数是一个数组，通过这个数组来判定是否更新回掉函数
>
> 这种方式可以运用在元素、组件、上下文中，尤其是利用在数组上。

```jsx

useMemo(() => (
  <div>
    {
      list.map((item, index) => (
        <p key={index}>
          {item.name}
          </>
          )}
    }
   </div>
),[list])
```

从上面我们看出 `useMemo`只有在`list`发生变化的时候才会进行渲染，从而减少了不必要的开销

总结一下`useMemo`的好处：

- 可以减少不必要的循环和不必要的渲染
- 可以减少子组件的渲染次数
- 通过特地的依赖进行更新，可以避免很多不必要的开销，但要注意，有时候在配合 `useState`拿不到最新的值，这种情况可以考虑使用 `useRef`解决