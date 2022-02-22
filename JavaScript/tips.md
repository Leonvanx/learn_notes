TOC
- [一些注意的点](#一些注意的点)
- [一些常用ES6语法](#一些常用es6语法)
	- [数组部分](#数组部分)
		- [扩展运算符](#扩展运算符)
		- [find(),findIndex()](#findfindindex)
		- [entries()，keys() 和 values()](#entrieskeys-和-values)
		- [includes()](#includes)
	- [对象部分](#对象部分)

## 一些注意的点
1. 时刻注意引用数据类型赋值的问题。
2. W3C标准定义当form表单只有一个input框时，按下回车键会自动提交表单，在实际应用中表现为包含form的弹窗会自动关闭，解决办法：给form加@.submit.native.prevent阻止默认事件，或者增加一个隐藏的input。
3. 模板字符串里可使用${param}方式获取变量值。

**[⬆ back to top](#TOC)**

## 一些常用ES6语法
### 数组部分

#### 扩展运算符

* 函数调用

```javascript
function add(x, y, z) {
	return x + y - z;
};
const numbers = [4, 38, 45];
add(...numbers);	//-3
```
* 复制数组  
> 数组不是基本数据类型，直接用=号赋值，只是拷贝了一份指向底层的数据结构的指针。

```javascript
let arr1 = [1,2,3];
let arr2 = a;
arr1[0] = 0;
arr2 //0,2,3
```
上述代码中，修改arr1会影响arr2的值。
使用扩展运算符复制数组。
```js
const arr1 = [1, 2];
// 写法一
const arr2 = [...arr1];
// 写法二
const [...arr2] = arr1;
```
此时再修改arr1不会影响arr2的值。
> 注意，使用此方法拷贝数组依然属于一级浅拷贝，数组内的数据为基本数据类型时不会受影响，当数组内的数据不是基本数据类型时，修改某个引用数据类型的数据的值，依然会造成拷贝出来的数组内的对应数据的值改变。

* 合并数组  
es5合并需要使用concat函数
```js
//es6则不需要
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];
[...arr1, ...arr2, ...arr3]	//[ 'a', 'b', 'c', 'd', 'e' ]
```

#### find(),findIndex()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。

```js
[1, 5, 10, 15].find((value, index, arr) =>{
  return value > 9;
}) // 10
```
> 上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组.


数组实例的findIndex()方法的用法与find()方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```
> 上面的代码中，find函数接收了第二个参数person对象，回调函数中的this对象指向person对象。

#### entries()，keys() 和 values()

上述三个数组实例的方法都用于遍历数组，返回一个遍历器对象，可用`for...of`循环输出该对象的值。

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1
// keys()输出的是对键名遍历的结果

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'
// values()输出的是对键值遍历的结果

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
// values()输出的是对键值对遍历的结果
```

#### includes()
数组实例的includes()方法用于判断数组是否包含某个给定的值，返回boolean值。

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

该方法的第二个参数表示搜索的起始位置，默认为`0`。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为`-4`，但数组长度为`3`），则会重置为从`0`开始。

```js
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```



### 对象部分

#### 属性的简写表达式

```js
function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
```

方法也可以简写，如下：

```js
let birth = '2000/01/01';

const Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
```

#### 属性的遍历

ES6一共有五种遍历对象的属性的方法：

1. `for...in`  

循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

2. `Object.keys(obj)`

返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

3. `Object.getOwnPropertyNames(obj)`

返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

4. `Object.getOwnPropertySymbols(obj)`

返回一个数组，包含对象自身的所有 Symbol 属性的键名。

5. `Reflect.ownKeys(obj)`

返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

* 首先遍历所有数值键，按照数值升序排列。
* 其次遍历所有字符串键，按照加入时间升序排列
* 最后遍历所有 Symbol 键，按照加入时间升序排列。
