### 行内样式

行内样式不做过多介绍。

```jsx
class App extends React.Component {
 // ...
 render() {
  return (
   <div style={{ background: '#eee', width: '200px', height: '200px'}}>
    <p style= {{color:'red', fontSize:'40px'}}>行内样式</p>
   </div>
  )
 }
}
```

需要注意的是，这里的css样式名采用驼峰命名法：如font-size →fontSize，并且你需要将CSS属性放在双大括号之间。为什么要用两个大括号？因为在JSX中渲染的JS表达式，它们必须被放在一对大括号里，{style}可以视为一个JS对象。所以第一对大括号正是将JS表达式放入JSX解析，里面的那对大括号则创建了一个style对象实例，所以在这里style是作为一个对象传入组件。

### 声明样式

声明样式其实是行内样式的一种改进写法。

```jsx
class App extends React.Component {
 const style1={   
   background:'#eee',
   width:'200px',
   height:'200px'
  }
 
 const style2={   
   color:'red',
   fontSize:'40px'
  }
 
 render() {
  return (
   <div style={style1}>
    <p style= {style2}>行内样式</p>
   </div>
  )
 }
}
```

### 引入样式

引入样式就是将CSS文件写在外部，在引入使用，这种普通的引入样式实际上会有一定的问题。

css 文件

```css
.person{
  width: 60%;
  margin:16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding:16px;
  text-align: center;
}
```

js文件

```jsx
import React from 'react';
import './Person.css';
class App extends React.Component {
 
 //....  
 
 render() {
  return (
   <div className='person'>
    <p>person:Hello world</p>
   </div> 
  )
 }
}
export default App;
```

> 因为CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效，这可能会导致大量的冲突。也就是说如果我有两个css文件，它们的中的一些样式名是一样的，那么就会被覆盖，简单的解决办法就是将样式的命名变得复杂且不重复，但这样样式多了也很难避免重复，且命名也不会太好看。那么这个时候就推荐使用CSS Modules 了

### CSS Modules

CSS Modules 的做法就是通过配置将.css文件进行编译，编译后在每个用到css的组件中的css类名都是独一无二的，从而实现CSS的局部作用域。具体原理可以看看阮一峰老师的博客CSS Modules 用法教程。

在create-react-app2.0之前的版本，配置CSS Modules是需要eject弹出webpack来配置的，幸运的是，create-react-app自从2.0.版本就已经开始支持CSS Modules了，详见官网。可见create-react-app对webpack零配置的追求。

局部样式命名规则: xxx.module.css

引入方式 import xxx from 'xxx.module.css'

用法：`<div className={xxx.styleName}>`

全局样式命名规则: xxx.css  

引入方式 import ‘xxx.css’

用法：`<div className='styleName'>`

全局样式与局部样式混合使用：<div className={`styleName ${xxx['styleName']}`}>  ,其中styleName表示全局样式 ,`${xxx['styleName']`表示局部样式，注意{ }内使用模板字符串。

案例：

```jsx
person.module.css

.person{
  width: 60%;
  margin:16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding:16px;
  text-align: center;
}
person.js

import React, { Component } from 'react';
 
//局部样式
import styles from './Person.module.css';
 
//全局样式
import '../App.css'
class App extends Component {
 
 render() {
 
  return (
   <div className={styles.person}>
    <p className='fz'>person:Hello world</p>
   </div> 
  )
 }
}
export default App;
```

### Styled Components

Styled Component是react的一个第三方库，是CSS in JS 的优秀实践和代表，将CSS写在JS中，可以实现常规CSS所不好处理的逻辑复杂、函数方法、复用、避免干扰。

用法：

```js
/*
创建一个Title组件，
将render一个带有样式的h1标签
*/
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
/*
创建一个Wrapper组件，
将render一个带有样式的section标签
*/
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// 使用 Title and Wrapper 得到下面效果图
render(
  <Wrapper>
    <Title>
      Hello World!
    </Title>
  </Wrapper>
);
```

