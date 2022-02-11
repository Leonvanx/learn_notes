#TOC
1. [一些注意的点](#一些注意的点)

## 一些注意的点
1. 时刻注意引用数据类型赋值的问题。
2. W3C标准定义当form表单只有一个input框时，按下回车键会自动提交表单，在实际应用中表现为包含form的弹窗会自动关闭，解决办法：给form加@.submit.native.prevent阻止默认事件，或者增加一个隐藏的input。
3. 模板字符串里可使用${param}方式获取变量值。

**[⬆ back to top](#TOC)**

## 一些常用ES6语法
1. 深拷贝一个对象
```javascript
Object.assign(objA,objB);
```
2. 数组便利
```javascript
Object.keys(Array).forEach((key)=>{
	this.Array[key]
})
```
3. 数组
```javascript
this.arr.map((el,index)=>{
	if(this.arr2.find(item=>{
		item.id == el.id
	})){

	}
})
```
4. 1
```javascript
var newArr  = arr.map(item=>{
	key:item.a,
	value:item.b
})
```