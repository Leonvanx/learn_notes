# TOC

- [一些注意的点](#一些注意的点)
- [一些常用ES6语法](#一些常用es6语法)
	- [数组部分](#数组部分)
		- [扩展运算符](#扩展运算符)
		- [find(),findIndex()](#findfindindex)
		- [entries()，keys() 和 values()](#entrieskeys-和-values)
		- [includes()](#includes)
		- [every()](#every)
		- [some()](#some)
	- [对象部分](#对象部分)
	  * [属性的简写表达式](#属性的简写表达式)
	  * [属性的复制](#属性的复制)
	  * [属性的遍历](#属性的遍历)
	  * [解构赋值](#解构赋值)
	- [Map对象优化Switch语句](#巧用对象字面量或者Map优化Switch)
	- [可选链和空值合并](#可选链和空值合并)

## 一些注意的点
1. 时刻注意引用数据类型赋值的问题。
2. W3C标准定义当form表单只有一个input框时，按下回车键会自动提交表单，在实际应用中表现为包含form的弹窗会自动关闭，解决办法：给form加@.submit.native.prevent阻止默认事件，或者增加一个隐藏的input。
3. 模板字符串里可使用${param}方式获取变量值。

**[⬆ back to top](#TOC)**

## 一些常用ES6语法
### 数组部分

#### 扩展运算符

1. 函数调用

   ```js
   function add(x, y, z) {
   	return x + y - z;
   };
   const numbers = [4, 38, 45];
   add(...numbers);	//-3
   ```

2. 复制数组  

   > 数组不是基本数据类型，直接用=号赋值，只是拷贝了一份指向底层的数据结构的指针。  

   ```js
   let arr1 = [1,2,3];
   let arr2 = a;
   arr1[0] = 0;
   arr2 //0,2,3
   ```

   上述代码中，修改arr1会影响arr2的值，使用扩展运算符复制数组。

   ```js
   const arr1 = [1, 2];
   // 写法一
   const arr2 = [...arr1];
   // 写法二
   const [...arr2] = arr1;
   ```

   此时再修改arr1不会影响arr2的值。

   > 注意，使用此方法拷贝数组依然属于一级浅拷贝，数组内的数据为基本数据类型时不会受影响，当数组内的数据不是基本数据类型时，修改某个引用数据类型的数据的值，依然会造成拷贝出来的数组内的对应数据的值改变。

3. 合并数组

   ```js
   //es5合并需要使用concat函数，es6则不需要
   const arr1 = ['a', 'b'];
   const arr2 = ['c'];
   const arr3 = ['d', 'e'];
   [...arr1, ...arr2, ...arr3]	//[ 'a', 'b', 'c', 'd', 'e' ]
   ```

**[⬆ back to top](#TOC)**

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

**[⬆ back to top](#TOC)**

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

**[⬆ back to top](#TOC)**

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

#### every()

数组实例的every()方法用于判断数组的每一个成员是否符合给定的判断条件。

~~~js
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false
}
~~~

上述代码用来检查是否所有的水果都是红色的

#### some()

数组实例的some()方法用于判断数组是否有任何一个成员是否符合给定的判断条件。

~~~js
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];

function test() {
  // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true
}
~~~

上述代码用来检查是否有水果是红色的

**[⬆ back to top](#TOC)**

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

**[⬆ back to top](#TOC)**

#### 属性的复制

方法将所有[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)（`Object.propertyIsEnumerable()` 返回 true）和[自有](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)（`Object.hasOwnProperty()` 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

**[⬆ back to top](#TOC)**

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

   返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是。Symbol 或字符串，也不管是否可枚举。  

   以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

* 首先遍历所有数值键，按照数值升序排列。
* 其次遍历所有字符串键，按照加入时间升序排列
* 最后遍历所有 Symbol 键，按照加入时间升序排列。  

**[⬆ back to top](#TOC)**

#### 解构赋值

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

上面代码中，变量`z`是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（`a`和`b`），将它们连同值一起拷贝过来。

> 解构赋值要求等号右边必须为一个对象，解构赋值必须为最后一个参数，否则会报错。

解构赋值的拷贝也是浅拷贝。

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```

解构赋值还可以用于方法参数的解构。

🌰一：

假设有以下需求：

如果没有动物，抛出一个异常。

假设动物有类型，名字和性别中的其中任何一个属性，都打印其对应值。

代码如下：

~~~js
const printAnimalDetails = animal => {
  let result; // declare a variable to store the final value

  // condition 1: check if animal has a value
  if (animal) {
    // condition 2: check if animal has a type property
    if (animal.type) {
      // condition 3: check if animal has a name property
      if (animal.name) {
        // condition 4: check if animal has a gender property
        if (animal.gender) {
          result = ${animal.name} is a ${animal.gender} ${animal.type};;
        } else {
          result = "No animal gender";
        }
      } else {
        result = "No animal name";
      }
    } else {
      result = "No animal type";
    }
  } else {
    result = "No animal";
  }
  return result;
};

console.log(printAnimalDetails()); // 'No animal'

console.log(printAnimalDetails({ type: "dog", gender: "female" })); // 'No animal name'

console.log(printAnimalDetails({ type: "dog", name: "Lucy" })); // 'No animal gender'

console.log(
  printAnimalDetails({ type: "dog", name: "Lucy", gender: "female" })
); // 'Lucy is a female dog'
~~~

当我们用解构赋值加上三元运算符等语法重构上面代码后：

~~~js
const printAnimalDetails = ({type, name, gender } = {}) => {
  if(!type) return 'No animal type';
  if(!name) return 'No animal name';
  if(!gender) return 'No animal gender';

// Now in this line of code, we're sure that we have an animal with all //the three properties here.

  return ${name} is a ${gender} ${type};
}

console.log(printAnimalDetails()); // 'No animal type'

console.log(printAnimalDetails({ type: dog })); // 'No animal name'

console.log(printAnimalDetails({ type: dog, gender: female })); // 'No animal name'

console.log(printAnimalDetails({ type: dog, name: 'Lucy', gender: 'female' })); // 'Lucy is a female dog'
~~~

可以看到经过优化后的代码风格精简很多。

> 默认参数确保如果我们传递undefined作为一个方法的参数，我们仍然有值可以解构，在这里它是一个空对象{}。

🌰二：

当使用 JavaScript 工作时，我们总是需要检查 `null/undefined` 值并赋默认值，否则可能编译失败。

例如以下代码：

~~~js
function printVegetableName(vegetable) { 
    if (vegetable && vegetable.name) {
     console.log (vegetable.name);
   } else {
    console.log('unknown');
   }
}

printVegetableName(undefined); // unknown
printVegetableName({}); // unknown
printVegetableName({ name: 'cabbage', quantity: 2 }); // cabbage
~~~

我们能通过使用默认参数和解构来避免条件语句 `if (vegetable && vegetable.name) {} 。`

~~~js
// destructing - get name property only
// assign default empty object {}

function printVegetableName({name} = {}) {
   console.log (name || 'unknown');
}


printVegetableName(undefined); // unknown
printVegetableName({ }); // unknown
printVegetableName({ name: 'cabbage', quantity: 2 }); // cabbage
~~~

因为我们只需要 `name` 属性，所以我们可以使用 `{ name }` 解构参数，然后我们就能在代码中使用 `name` 作为变量，而不是 `vegetable.name` 。

**[⬆ back to top](#TOC)**

#### 扩展运算符

对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}
```

如果扩展运算符后面不是对象，则会自动将其转为对象。但是，如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。

```js
{...true}
// {}
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```

对象的扩展运算符等同于使用`Object.assign()`方法。

```javascript
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

扩展运算符还可以用于合并两个对象。

```javascript
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```

**[⬆ back to top](#TOC)**

### 巧用对象字面量和Map优化Switch语句

让我们来看看下面的🌰，我们想要基于颜色打印水果：

```js
function printFruits(color) {
  // use switch case to find fruits by color
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

printFruits(null); // []
printFruits('yellow'); // ['banana', 'pineapple']
```

我们可以使用Map对象来优化上述代码：

```js
const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function printFruits(color) {
  return fruitColor.get(color) || [];
}
```

> `Map` 允许保存键值对，是自从ES2015以来可以使用的对象类型。

还可以使用对象字面量以更清晰的语法实现：

~~~js
const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
  };

function printFruits(color) {
  return fruitColor[color] || [];
}
~~~

甚至，你可以使用数组方法 `Array.filter` 来实现。

~~~js
const fruits = [
    { name: 'apple', color: 'red' }, 
    { name: 'strawberry', color: 'red' }, 
    { name: 'banana', color: 'yellow' }, 
    { name: 'pineapple', color: 'yellow' }, 
    { name: 'grape', color: 'purple' }, 
    { name: 'plum', color: 'purple' }
];

function printFruits(color) {
  return fruits.filter(fruit => fruit.color === color);
}
~~~

