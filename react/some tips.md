[TOC]

# class组件中定义方法的注意事项

有如下代码：

```jsx
class Square extends Component {
  render() {
    return (
      <button className="square" onClick={this.buttonClick1.bind(this)}>
        {/* TODO */}
      </button>
    );
  }
  componentDidMount() {
    console.log(this.props);
  }
  buttonClick1() {
    console.log(this.props.squareNumber);
  }
  buttonClick2 = () => {
    console.log(this.props.squareNumber);
  };
}
```

在一个类组件中定义方法时，有两种方法：

1. 普通方式，即上面的buttonClick1

2. 箭头函数，即上面的buttonClick2

当选择第一种普通函数的方式定义方法时，则需要加.bind(this)绑定。选择第二种箭头函数的方式定义方法时，则不需要（react官方推荐）

造成这种现象的原因：JavaScript关于this指向的问题。（深入研究则包含了JS执行上下文，原型链等等知识）