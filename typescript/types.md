# TypeScript基本数据类型

1. 基本类型：`string` 、`number` 、`boolean` 、`null` 、`undefined` 、`symbol` 、`bigint`
2. 饮用数据类型：`array` 、`Tuple` 、`object`(包含`Object`和`{}`) 、`function`
3. 特殊类型：`any` 、`unknow` 、`void` 、`never` 、`Enum` 
4. 其他类型：类型推理、字面量类型、交叉类型、联合类型

## object,Object和{}类型

1. object，用于表示非原始类型的一个类型

   ```typescript
   // node_modules/typescript/lib/lib.es5.d.ts
   interface ObjectConstructor {
     create(o: object | null): any;
     // ...
   }
   
   const proto = {};
   
   Object.create(proto);     // OK
   Object.create(null);      // OK
   Object.create(undefined); // Error
   Object.create(1337);      // Error
   Object.create(true);      // Error
   Object.create("oops");    // Error
   ```

2. Object,是所有**Object**类的实例的类型，由以下两个接口来定义：

   * `Object `接口定义了 `Object.prototype `原型对象上的属性；

     ```typescript
     // node_modules/typescript/lib/lib.es5.d.ts
     interface Object {
       constructor: Function;
       toString(): string;
       toLocaleString(): string;
       valueOf(): Object;
       hasOwnProperty(v: PropertyKey): boolean;
       isPrototypeOf(v: Object): boolean;
       propertyIsEnumerable(v: PropertyKey): boolean;
     }
     ```

   * `ObjectConstructor `接口定义了 `Object `类的属性。

     ```typescript
     // node_modules/typescript/lib/lib.es5.d.ts
     interface ObjectConstructor {
       /** Invocation via `new` */
       new(value?: any): Object;
       /** Invocation via function calls */
       (value?: any): any;
       readonly prototype: Object;
       getPrototypeOf(o: any): any;
       // ···
     }
     
     declare var Object: ObjectConstructor;
     ```

3. {}类型，描述了一个没有成员的对象。当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误。

   ```typescript
   // Type {}
   const obj = {};
   
   // Error: Property 'prop' does not exist on type '{}'.
   obj.prop = "semlinker";
   ```

## Tuple（元组）

`Tuple` 是`Array`的一种特殊情况，既是限制元素的类型和个数的数组。

```typescript
let t: [number, string] = [1, '2'] // ok
let t1: [number, string] = [1, 3] // error
let t3: [number, string] = [1, '1', 'true'] // error
let t3: [number, string] = [1, '1', true] // error
```

> Tuple允许使用`push`方法，但不允许访问。

```typescript
t.push(2)
console.log(t) // [1, '2', 2]
let c = t[2] // error
```

## Enum（枚举）

注意⚠️：

* 枚举的类型智能是 `string` 或者`number`
* 定义的名称不能是关键字

1. 数字枚举

   * 枚组的类型默认为**数字类型**，默认从0开始以此累加，如果有设置默认值，则**只会对下面的值产生影响**
   * 同时支持**反向映射**（及从成员值到成员名的映射），但智能映射无默认值的情况，并且只能是默认值的前面

   ```typescript
   enum numberType {
     A,
     B,
     C = 7,
     D,
   }
   
   let num = numberType.A;
   let num1 = numberType.B;
   let num2 = numberType[0];
   let num3 = numberType[1];
   let num4 = numberType[2];
   let num5 = numberType[7];
   let num6 = numberType.C;
   let num7 = numberType.D;
   let num8 = numberType[8];
   console.log('num:'+num);		// 0
   console.log('num1:'+num1);	// 1
   console.log('num2:'+num2);	// A
   console.log('num3:'+num3);	// B
   console.log('num4:'+num4);	// undefined
   console.log('num5:'+num5);	// C
   console.log('num6:'+num6);	// 7
   console.log('num7:'+num7);	// 8
   console.log('num8:'+num8);	// D

2. 字符串枚举

   必须有默认值，不支持反向映射

3. 常亮枚举

   通过`const`去定义`enum`，但这种类型不会编译成任何 `JS`,只会编译对应的值。

   ```typescript
   enum numberType {
     A,
     B,
     C = 7,
     D,
   }
   let num = numberType.A;
   let num2 = numberType.C;
   //编译后：
   var num = 0;
   var num2 = 7
   ```

4. 异构枚举

   包含了 `数字类型` 和 `字符串类型` 的混合，反向映射一样的道理

## 类型推理

在`TS`中如果不设置类型，并且不进行赋值时，将会推论为**any**类型，如果进行赋值就会默认为该值的类型。

```typescript
let a; // 推断为any类型；
let str = '字符串'; // 推断为string
let flag = true;	//	推断为boolean
let num = 10;	//	推断为number
```

## 字面量类型

```typescript
let str:'字符串';
let num:1|2|3;
let flag:true;

str = 'str';	//error, str只能是字符串
num = 10;	//error, num只能是1、2或者3
flag = false; //error, flag只能是true
```

## 交叉类型

将多个类型合并为一个类型，使用`&`符号连接。

```typescript
type name = { a: string }
type age = { b: number }

type student = name & age

const Istudent: student = {
  a: '小红',
  b: 27
}
```

1. **同名基础属性合并**

当两个同名基础属性合并时，如果是相通的类型，合并后的类型不变，如果是不同的类型，合并后的类型会是`never`。

```typescript
type name = { a: string, c: number }
type age = { b: number, c: string }

type IStudent = name & age

const student: IStudent = {
  a: '小红',
  b: 27,
  c:  1, // error (property) c: never
  c:  'Domesy', // error (property) c: never
}
```

2. **同名非基础属性的合并**

当成员类型为非基础同名属性时，能够成功合并。

```typescript
interface A { a: number }
interface B { b: string }

interface C {
  x: A
}
interface D {
  x: B
}
type IStudent = C & D

const student: IStudent = {
  x: {
    a: 27,
    b: '小红'
  }
}

console.log(student) // { x: { "a": 7, "b": "小红" }}
```

> 当A接口的成员是b:number，合并行为会和同名基础属性合并一样，b变为never。

## 联合类型（Union Types）





## type和interface的区别

类型别名和接口非常相似，但在特定情况下稍有不同。

1. `type` 和 `interface` 都可以定义对象和函数。
2. `interface` 可以重复定义，并且会进行合并，`type` 不行。
3. `type` 可以定义其他数据类型，如字符串、数字、元祖、联合类型等，`interface` 不行。`interface` 和 `type` 相互扩展，但方式不同。`interface` 通过`extends`，`type` 通过 `&`操作符。

```typescript
// interface 扩展 interface
interface A {
  a: string
}
interface B extends  A {
  b: number
}
const obj:B = { a: `小杜杜`, b: 7 }

// type 扩展 type
type C = { a: string }
type D = C & { b: number }
const obj1:D = { a: `小杜杜`, b: 7 }

// interface 扩展为 Type
type E = { a: string }
interface F extends E { b: number }
const obj2:F = { a: `小杜杜`, b: 7 }

// type 扩展为 interface
interface G { a: string }
type H = G & {b: number}
const obj3:H = { a: `小杜杜`, b: 7 }
```



