this的5种绑定方式：

- 默认绑定(非严格模式下this指向全局对象,     严格模式下this会绑定到undefined)
- 隐式绑定(当函数引用有**上下文对象**时, 如     obj.foo()的调用方式, foo内的this指向obj)
- 显示绑定(通过call()或者apply()方法直接指定this的绑定对象,     如foo.call(obj))
- new绑定
- 箭头函数绑定(this的指向由外层作用域决定的)

**1. 默认绑定**

也就是我们常说的：在非严格模式下this指向的是全局对象window，而在严格模式下会绑定到undefined。

**1.1 题目一**

```js
var a = 10;
function foo() {
 console.log(*this*.a)
}
foo();
```

我们知道在使用var创建变量的时候(不在函数里)，会把创建的变量绑定到window上，所以此时a是window下的属性。而函数foo也是window下的属性。因此上面的代码其实就相当于是这样:

```js
window.a = 10;

function foo() {
 console.log(*this*.a)
}
window.foo();
```

在这里，调用 `foo()` 函数的是 `window` 对象，且又是在非严格模式下，所以 `foo()` 中 `this` 的指向是 `window` 对象，因此 `this.a`会输出10。

**1.2 题目二**

```js
"use strict";
var a = 10;
function foo() {
 console.log('this1', *this*)
 console.log(window.a)
 console.log(*this*.a)
}
console.log(window.foo)
console.log('this2', *this*)
foo();
```

需要注意的点：

- 开启了严格模式，只是说使得函数内的this指向undefined，它并不会改变全局中this的指向。因此this1中打印的是undefined，而this2还是window对象。
- 另外，它也不会阻止a被绑定到window对象上。

所以最后的执行结果：

f foo() {... }

'this2' Window{... }

'this1' undefined

10

Uncaught TypeError: Cannot read property 'a' of undefined

**1.3 题目三**

*let* a = 10

*const* b = 20

*function* foo() {

 console.log(*this*.a)

 console.log(*this*.b)

}

foo();

console.log(window.a)

 

如果把var改成了let 或者 const，变量是不会被绑定到window上的，所以此时会打印出三个undefined。

答案：

 

undefined

undefined

undefined

**1.4 题目四**

*var* a = 1

*function* foo() {

 *var* a = 2

 console.log(*this*)

 console.log(*this*.a)

}

foo()

这里我们很容易就知道，foo()函数内的this指向的是window，因为是window调用的foo。但是打印出的this.a呢？注意，是this.a，不是a，因此是window下的a。

并且由于函数作用域的原因我们知道window下的a还是1。因此答案为：

Window{...}

1

**1.5 题目五**

*var* a = 1

*function* foo() {

 *var* a = 2

 *function* inner() {

  console.log(*this*.a)

 }

 inner()

}

foo()

其实这里和1.4很像，不过一看到函数内的函数，就很容易让人联想到闭包 😂，然后... 然后就脱口而出，答案是2啊，这还不简单。小伙伴们，审题可得仔细啊，这里问你的是this.a，而在inner中，this指向的还是window。

答案：1

**2. 隐式绑定**

**this 永远指向最后调用它的那个对象**。谁最后调用的函数，函数内的this指向的就是谁(不考虑箭头函数)

**2.1 题目一**

*function* foo() {

 *console*.log(this.a)

}

*var* obj = { a: 1, foo }

*var* a = 2

obj.foo()

 

(var obj = { foo }就相当于是var obj = { foo: foo }，这个大家应该都知道吧)

在这道题中，函数foo()虽然是定义在window下，但是我在obj对象中引用了它，并将它重新赋值到obj.foo上。且调用它的是obj对象，因此打印出来的this.a应该是obj中的a。换个角度想，上面👆这段代码是不是就相当于是这样：

*var* obj = {

 a: 1,

 foo: *function* () {

  *console*.log(this.a)

 }

}

*var* a = 2

obj.foo()

答案都是：

**3. 隐式绑定的隐式丢失问题**

隐式丢失其实就是被隐式绑定的函数在特定的情况下会丢失绑定对象。

有两种情况容易发生隐式丢失问题：

- 使用另一个变量来给函数取别名
- 将函数作为参数传递时会被隐式赋值，回调函数丢失this绑定

 

**3.1 题目一**

使用另一个变量来给函数取别名会发生隐式丢失。

 

*function* foo() {

 *console*.log(this.a)

};

*var* obj = { a: 1, foo };

*var* a = 2;

*var* foo2 = obj.foo;

obj.foo();

foo2();

 

在这里我们已经知道了，obj.foo()中this的指向是为obj的(可以看第二部分隐式绑定)，所以obj.foo()执行的时候，打印出来的是obj对象中的a，也就是1。

但是foo2它不也是obj.foo吗？我只不过是用了一个变量foo2来盛放了它而已。所以你是不是认为它打印的也是1呢？

额 😅，其实这里不是的，它打印出的是window下的a。这是因为虽然foo2指向的是obj.foo函数，不过调用它的却是window对象，所以它里面this的指向是为window。

答案：1 2

**3.2 题目二**

*function* foo() {

 *console*.log(this.a)

};

*var* obj = { a: 1, foo };

*var* a = 2;

*var* foo2 = obj.foo;

*var* obj2 = { a: 3, foo2: obj.foo }

obj.foo();

foo2();

obj2.foo2();

 

答案：1 2 3

- obj.foo()中的this指向调用者obj
- foo2()发生了隐式丢失，调用者是window，使得foo()中的this指向window
- foo3()发生了隐式丢失，调用者是obj2，使得foo()中的this指向obj2

**3.3 题目三**

如果你把一个函数当成参数传递时，也会被隐式赋值，发生意想不到的问题。

 

*function* foo() {

 *console*.log(this.a)

}

*function* doFoo(*fn*) {

 *console*.log(this)

 fn()

}

*var* obj = { a: 1, foo }

*var* a = 2

doFoo(obj.foo)

这里我们将obj.foo当成参数传递到doFoo函数中，在传递的过程中，obj.foo()函数内的this发生了改变，指向了window。

因此结果为：Window{...}   2

**3.4 题目四**

现在我们不用window调用doFoo，而是放在对象obj2里，用obj2调用：

 

*function* foo() {

 *console*.log(this.a)

}

*function* doFoo(*fn*) {

 *console*.log(this)

 fn()

}

*var* obj = { a: 1, foo }

*var* a = 2

*var* obj2 = { a: 3, doFoo }

obj2.doFoo(obj.foo)

 

现在调用obj2.doFoo()函数，里面的this指向的应该是obj2，因为是obj2调用的它。但是obj.foo()打印出来的a依然是2，也就是window下的。

执行结果为：{ a:3, **do**Foo: f }   2

**所以说，如果你把一个函数当成参数传递到另一个函数的时候，也会发生隐式丢失的问题，且与包裹着它的函数的this指向无关。在非严格模式下，会把该函数的this绑定到window上，严格模式下绑定到undefined。**

**4. 显式绑定**

功能如其名，就是强行使用某些方法，改变函数内this的指向。

通过call()、apply()或者bind()方法直接指定this的绑定对象, 如foo.call(obj)。

这里有几个知识点需要注意：

- 使用.call()或者.apply()的函数是会直接执行的

- bind()是创建一个新的函数，需要手动调用才会执行
- .call()和.apply()用法基本类似，不过call接收若干个参数，而apply接收的是一个数组

**4.1 题目一**

*function* foo () {

 *console*.log(this.a)

}

*var* obj = { a: 1 }

*var* a = 2

foo()

foo.call(obj)

foo.apply(obj)

foo.bind(obj)

答案：

**4.2 题目二**

*var* obj1 = {

 a: 1

}

*var* obj2 = {

 a: 2,

 foo1: *function* () {

  *console*.log(this.a)

 },

 foo2: *function* () {

  setTimeout(*function* () {

   *console*.log(this)

   *console*.log(this.a)

  }, 0)

 }

}

*var* a = 3

obj2.foo1()

obj2.foo2()

 

对于setTimeout中的函数，这里存在隐式绑定的隐式丢失，也就是当我们将函数作为参数传递时会被隐式赋值，回调函数丢失this绑定，因此这时候setTimeout中的函数内的this是指向window的

 

所以最终的结果是：

 

2

Window{...}

3

**4.3 题目三**

面对上面👆这种情况我们就可以使用call、apply 或者bind来改变函数中this的指向，使它绑定到obj1上，从而打印出1。

*var* obj1 = {

 a: 1

}

*var* obj2 = {

 a: 2,

 foo1: *function* () {

  *console*.log(this.a)

 },

 foo2: *function* () {

  setTimeout(*function* () {

   *console*.log(this)

   *console*.log(this.a)

  }.call(obj1), 0)

 }

}

*var* a = 3

obj2.foo1()

obj2.foo2()

 

现在的执行结果就是：

2

{ a: 1 }

1

这里的写法是将.call运用到setTimeout里的回调函数上，并不是运用到obj2.foo2()上。

 

所以下面的这种写法不可以吗？

 

obj2.foo2.call(obj1)

**注意⚠️**：如果是这种写法的话，改变的就是foo2函数内的this的指向了，但是我们知道，foo2函数内this的指向和setTimeout里函数的this是没有关系的，因为调用定时器的始终是window。

**4.4 题目四**

*var* obj1 = {

 a: 1

}

*var* obj2 = {

 a: 2,

 foo1: *function* () {

  *console*.log(this.a)

 },

 foo2: *function* () {

  *function* inner () {

   *console*.log(this)

   *console*.log(this.a)

  }

  inner()

 }

}

*var* a = 3

obj2.foo1()

obj2.foo2()

调用inner函数的依然是window，所以结果为：

2

Window{...}

3

 

如果给inner()函数显式绑定的话：

结果为

2

{ a: 1 }

1

**4.5 题目五**

*function* foo () {

 *console*.log(this.a)

}

*var* obj = { a: 1 }

*var* a = 2

foo()

foo.call(obj)

foo().call(obj)

 

结果：

2

1

2

Uncaught TypeError: Cannot read property 'call' of undefined

- foo().call(obj)开始会执行foo()函数，打印出2，但是会对foo()函数的返回值执行.call(obj)操作，可是我们可以看到foo()函数的返回值是undefined，因此就会报错了。

所以我们可以看到foo.call()和foo().call()的区别了，一个是针对于函数，一个是针对于函数的返回值。

**4.6 题目六**

OK👌，既然刚刚4.5是因为函数没有返回值才报的错，那我现在给它加上返回值看看：

*function* foo () {

 *console*.log(this.a)

 return *function* () {

  *console*.log(this.a)

 }

}

*var* obj = { a: 1 }

*var* a = 2

foo()

foo.call(obj)

foo().call(obj)

结果竟然是：

2

1

2

1

- 第一个数字2自然是foo()输出的，虽然foo()函数也返回了一个匿名函数，但是并没有调用它呀，只有写成foo()()，这样才算是调用匿名函数。
- 第二个数字1是foo.call(obj)输出的，由于.call()是紧跟着foo的，所以改变的是foo()内this的指向，并且.call()是会使函数立即执行的，因此打印出1，同理，它也没有调用返回的函数。
- 第三个数字2是foo().call(obj)先执行foo()时打印出来的，此时foo()内this还是指向window。
- 在执行完foo()之后，会返回一个匿名函数，并且后面使用了.call(obj)来改变这个匿名函数的this指向并调用了它，所以输出了1。

**4.7 题目七**

先来回忆一下它们的区别：call是会直接执行函数的，bind是返回一个新函数，但不会执行。

 

*function* foo () {

 *console*.log(this.a)

 return *function* () {

  *console*.log(this.a)

 }

}

*var* obj = { a: 1 }

*var* a = 2

foo()

foo.bind(obj)

foo().bind(obj)

 

结果自然就是：

2

2

**总结**

总结一下这部分的知识点好了：

- this 永远指向最后调用它的

- 匿名函数的this永远指向window
- 使用.call()或者.apply()的函数是会直接执行的

- bind()是创建一个新的函数，需要手动调用才会执行

- 如果call、apply、bind接收到的第一个参数是空或者null、undefined的话，则会忽略这个参数

- forEach、map、filter函数的第二个参数也是能显式绑定this的

**5****. 箭头函数绑定**

 箭头函数，它里面的 `this` 是由外层作用域来决定的，且指向函数定义时的 `this` 而非执行时。

 箭头函数中没有* *this* *绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则* *this* *绑定的是最近一层非箭头函数的* *this**，否则，**this* *为* *undefined**。*

**5****.1 题目一**

*var* obj = {

 name: 'obj',

 foo1: () *=>* {

  *console*.log(this.name)

 },

 foo2: *function* () {

  *console*.log(this.name)

  return () *=>* {

   *console*.log(this.name)

  }

 }

}

*var* name = 'window'

obj.foo1()

obj.foo2()()

 

- 对于obj.foo1()函数的调用，它的外层作用域是window，对象obj当然不属于作用域了(我们知道作用域只有全局作用域window和局部作用域函数)。所以会打印出window

obj.foo2()()，首先会执行obj.foo2()，这不是个箭头函数，所以它里面的this是调用它的obj对象，因此打印出obj，而返回的匿名函数是一个箭头函数，**它的****this****由外层作用域决定****，**那也就是函数foo2咯，那也就是它的this会和foo2函数里的this一样，就也打印出了obj。

答案：

'window'

'obj'

'obj'

**5****.****2** **题目****二**

*var* name = 'window'

*function* Person (*name*) {

 this.name = name

 this.foo1 = *function* () {

  *console*.log(this.name)

 }

 this.foo2 = () *=>* {

  *console*.log(this.name)

 }

}

*var* person2 = {

 name: 'person2',

 foo2: () *=>* {

  *console*.log(this.name)

 }

}

*var* person1 = new Person('person1')

person1.foo1()

person1.foo2()

person2.foo2()

解题思路：

 

- person1.foo1()是个普通函数，**this由最后调用它的对象决定**，即person1。

 

- person1.foo2()为箭头函数，**this由外层作用域决定，且指向函数定义时的this而非执行时**，在这里它的外层作用域是函数Person，且这个是构造函数，并且使用了new来生成了对象person1，所以此时this的指向是为person1。

 

- person2.foo2()字面量创建的的对象person2中的foo2是个箭头函数，由于person2是直接在window下创建的，你可以理解为它所在的作用域就是在window下，因此person2.foo2()内的this应该是window。

 

答案：

'person1'

'person1'

'window'

**7.3 题目三**

*var* obj3 = {

 name: 'obj3',

 foo: () *=>* {

  *console*.log(this.name)

  return *function* () {

   *console*.log(this.name)

  }

 }

}

*var* obj4 = {

 name: 'obj4',

 foo: () *=>* {

  *console*.log(this.name)

  return () *=>* {

   *console*.log(this.name)

  }

 }

}

obj1.foo()()

obj2.foo()()

obj3.foo()()

obj4.foo()()

 

答案：

obj1.foo()() // 'obj1' 'window'

obj2.foo()() // 'obj2' 'obj2'

obj3.foo()() // 'window' 'window'

obj4.foo()() // 'window' 'window'

**总结**

OK👌，来总结一下箭头函数需要注意的点吧：

- 它里面的this是由外层作用域来决定的，且指向函数定义时的this而非执行时
- 字面量创建的对象，作用域是window，如果里面有箭头函数属性的话，this指向的是window
- 构造函数创建的对象，作用域是可以理解为是这个构造函数，且这个构造函数的this是指向新建的对象的，因此this指向这个对象。
- 箭头函数的this是无法通过bind、call、apply来**直接**修改，但是可以通过改变作用域中this的指向来间接修改。

**优点**

- 箭头函数写代码拥有更加简洁的语法(当然也有人认为这是缺点)

- this由外层作用域决定，所以在某些场合我们不需要写类似const that = this这样的代码

 

**避免使用的场景**

 

1. 使用箭头函数定义对象的方法

 

*let* obj = {

 value: 'LinDaiDai',

 getValue: () *=>* *console*.log(this.value)

}

obj.getValue() // undefined

1. 定义原型方法

*function* Foo (*value*) {

 this.value = value

}

*Foo*.prototype.getValue = () *=>* *console*.log(this.value)

*const* foo1 = new Foo(1)

foo1.getValue() // undefined

1. 构造函数使用箭头函数

*const* Foo = (*value*) *=>* {

 this.value = value;

}

*const* foo1 = new Foo(1)

// 事实上直接就报错了 Uncaught TypeError: Foo is not a constructor

*console*.log(foo1);

1. 作为事件的回调函数

*const* button = document.getElementById('myButton');

button.addEventListener('click', () *=>* {

  *console*.log(this === window); // => true

  this.innerHTML = 'Clicked button';

});