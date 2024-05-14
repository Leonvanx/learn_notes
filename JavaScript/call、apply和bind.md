在JavaScript中，`call`、`apply`和`bind`是用于在函数内部控制`this`关键字的三个方法。它们的主要作用是允许你显式地指定函数内部的`this`值，并在调用函数时传递参数。

1. **`call`**:

   - Syntax: `function.call(thisArg, arg1, arg2, ...)`

   - The `call` method allows you to call a function with a specified `this` value and arguments provided individually.

   - Example:

     ```js
     function greet(name) {
         return `Hello, ${name}!`;
     }
     console.log(greet.call(null, 'John')); // Output: Hello, John!
     ```

     

2. **`apply`**:

   - Syntax: `function.apply(thisArg, [argsArray])`

   - The `apply` method is similar to `call`, but it accepts arguments as an array.

   - Example:

     ```js
     function greet(name) {
         return `Hello, ${name}!`;
     }
     console.log(greet.apply(null, ['John'])); // Output: Hello, John!
     ```

3. **`bind`**:

   - Syntax: `function.bind(thisArg, arg1, arg2, ...)`

   - The `bind` method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

   - Example:

     ```js
     function greet(name) {
         return `Hello, ${name}!`;
     }
     const boundGreet = greet.bind(null, 'John');
     console.log(boundGreet()); // Output: Hello, John!
     ```

>call 和 apply 允许分别向函数传递单独的参数或数组参数。
>
>call 和 apply 使用指定的 this 值和参数立即执行函数。
>bind 返回一个带有指定 this 值和参数的新函数，但不会立即执行该函数。您需要单独调用绑定的函数。