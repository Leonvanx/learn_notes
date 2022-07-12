# TypeScript断言

TypeScript类型断言有三种，分别是：

1. 类型断言
2. 非空断言
3. 确定赋值断言

## 类型断言

类型断言，即主动告知编译器当前值的数据类型。可以使用尖括号和 `as` 语法。

```typescript
// 尖括号
let a = 'string';
let b:string = (<string>a).length;
// as语法
let a = 'string';
let b:string = (a as string).length;
```

> 尖括号语法在react中会和JSX语法冲突导致报错，所以建议只使用 `as` 语法）

## 非空断言

用`!`来修饰对象，告知编译器当前操作对象不会为 `null` 或者 `undefinde `类型。

```typescript
const setName = (name:string|null)=>{
   const str:string = name;	//err
   const str1:string = name!;	//ok
   console.log(str)
}
// err: Type 'string | null' is not assignable to type 'string'.
//      Type 'null' is not assignable to type 'string'.(2322)
```

## 确定赋值断言

允许在实例属性和变量声明后面放置一个 `!` 号，以告诉`TS`该属性会被明确赋值。

```typescript
let num: number;
let num1!: number;

const setNumber = () => num = 7
const setNumber1 = () => num1 = 7

setNumber()
setNumber1()

console.log(num) // err
console.log(num1) // ok

//err:Variable 'num' is used before being assigned.(2454)
```

## 双重断言

一般不会用

```typescript
interface Info{
  name: string;
  age: number;
}

const name = '小杜杜' as Info; // error, 原因是不能把 string 类型断言为 一个接口
const name1 = '小杜杜' as any as Info; //ok
```



