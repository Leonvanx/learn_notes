#TOC
- [一些注意的点](#一些注意的点)
- [一些常用ES6语法](#一些常用es6语法)
	- [数组部分](#数组部分)
		- [用法](#用法)
	- [对象部分](#对象部分)

## 一些注意的点
1. 时刻注意引用数据类型赋值的问题。
2. W3C标准定义当form表单只有一个input框时，按下回车键会自动提交表单，在实际应用中表现为包含form的弹窗会自动关闭，解决办法：给form加@.submit.native.prevent阻止默认事件，或者增加一个隐藏的input。
3. 模板字符串里可使用${param}方式获取变量值。

**[⬆ back to top](#TOC)**

## 一些常用ES6语法
### 数组部分
1. 扩展运算符
#### 用法
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

* Array.find()和Array.findIndex()  
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
```js
[1, 5, 10, 15].find((value, index, arr) =>{
  return value > 9;
}) // 10
```
> 上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组.

	数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```
> 上面的代码中，find函数接收了第二个参数person对象，回调函数中的this对象指向person对象。


* Array.findeIndex()






### 对象部分

