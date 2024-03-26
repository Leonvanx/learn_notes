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

## useCallBack

`useCallback` 与 `useMemo` 极其类似,可以说是一模一样，唯一不同的是 `useMemo` 返回的是函数运行的**结果**，而`useCallback`返回的是**函数**

> 这个函数是**父组件**传递**子组件**的一个函数，防止做无关的刷新，其次，这个组件必须配合 `memo` ,否则不但不会提升性能，还有可能降低性能

```jsx
import React, { useState, useCallback } from 'react';
import { Button } from 'antd-mobile';

const MockMemo: React.FC<any> = () => {
  const [count,setCount] = useState(0)
  const [show,setShow] = useState(true)

  const  add = useCallback(()=>{
    setCount(count + 1)
  },[count])

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'flex-start'}}>
        <TestButton title="普通点击" onClick={() => setCount(count + 1) }/>
        <TestButton title="useCallback点击" onClick={add}/>
      </div>
      <div style={{marginTop: 20}}>count: {count}</div>
      <Button onClick={() => {setShow(!show)}}> 切换</Button>
    </div>
  )
}

const TestButton = React.memo((props:any)=>{
  console.log(props.title)
  return <Button color='primary' onClick={props.onClick} style={props.title === 'useCallback点击' ? {
      marginLeft: 20
    } : undefined}>{props.title}</Button>
})

export default MockMemo;
```

我们可以看到，当点击切换按钮的时候，没有经过 `useCallback`封装的函数会再次刷新，而进过过 `useCallback`包裹的函数不会被再次刷新。

## useRef

https://juejin.cn/post/6950464567847682056#heading-10

## useEffect和useLayoutEffect的区别

1. `useEffect` 是在渲染时异步执行，等到浏览器将所有变化渲染到屏幕后才会被执行。在本次更新完成后，再开启一个任务调度，在下次任务调度中执行。
2. `useLayoutEffect` 和 `componentDidMount`，`componentDidUpdate` 执行时机一样，在浏览器绘制之前调用，一般用它来同步更新 DOM，在浏览器将所有变化渲染到屏幕之前执行。

## forwardRef

1. 获取自定义函数组件的Ref，使用`forwardRef()`。

```jsx
const Input = forwardRef((props, ref) => {
  return (
    <input {...props} ref={ref}>
  )
})

class MyComponent extends React.Component {

  constructor() {
    this.ref = React.createRef(null);
  }

  clickHandle = () => {
    // 操作Input组件聚焦
    this.ref.current.focus();
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandle}>
          点击
        </button>
        <Input ref={this.ref}>
      </div>
    )
  }
}
```

2. class组件则使用`createRef`方法。

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }
  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

## useImperativeHandle

`useImperativeHandle` 可以自定义暴露给父组件的实例属性或者方法，通常与 `forwardRef` 配合使用，其实就是防止 `forwardRef` 暴露过多的组件实例方法或属性给父组件，导致不可预知的错误。

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}

FancyInput = forwardRef(FancyInput);

class App extends React.Component {

  constructor(props) {
    this.inputRef = React.createRef(null);
  }

  componentDidMount() {
    // 在此处调用foucus方法
    this.inputRef.current.focus();
  }

  render() {
    <div>
      <FancyInput ref={this.inputRef} />
    </div>
  }
}
```

