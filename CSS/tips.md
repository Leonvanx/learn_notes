# TOC
  - [一些注意的点](#一些注意的点)
  - [模仿Mac浏览器滚动条样式](#模仿mac浏览器滚动条样式)
  - [定位实现居中](#定位实现居中)
  - [子元素浮动造成父元素高度塌陷问题](#子元素浮动造成父元素高度塌陷问题)
  - [deep深度选择器](#deep深度选择器)
  - [css属性选择器](#css属性选择器)
  - [React和Vue中的样式隔离](# React和Vue中的样式隔离)


## 一些注意的点
1. 为第一个子元素设置margin-top时，会作用到父元素上导致上外边距溢出，解决办法：通过伪类给子元素增加一个空的table元素，或者改用padding-top。
2. 利用定位实现子元素的偏移时，父元素请设置对应宽高，否则效果可能不如预期.
3. 英文不会自动换行的解决办法，设置word-break属性为:break-all（按每个字母换行），break-word（按每个单词换行）。
4. 类似element UI框架的各种组件弹出框，修改其样式需要在style标签最顶层定义class类，因为默认并不在app.vue层级。
5. 使用el-input的number类型组件时，强行输入中文会发现光标错位，解决办法：组件的line-height给1。

**[⬆ back to top](#TOC)**

## 模仿Mac浏览器滚动条样式

```css
::webkit-scrollbar{
  height:1px;
  width:5px;
}
::webkit-scrollbar-thumb{
  border-radius:10px;
  background-color:#dddee0;
}
::webkit-scrollbar-track{
  border-radius:10px;
  background-color:#fffdf0;
}
```
![](https://cdn.jsdelivr.net/gh/Leonvanx/picgo-repo/image/20220210160707.png)
**[⬆ back to top](#TOC)**

## 定位实现居中
> 水平垂直居中

```csss
.center{
  position: relative;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  left: 50%;
}
```
> 垂直居中

```css
.centerY{
  position: relative;
  transform: translateY(-50%);
  top: 50%;
}
```
> 水平居中

```css
.centerX{
  position: relative;
  transform: translateX(-50%);
  left: 50%;
}
```
**[⬆ back to top](#TOC)**

## 子元素浮动造成父元素高度塌陷问题
解决办法：
  1. 在父元素利用伪类清除浮动。（推荐）
  ```css
  .parent::after {
		display: block;
		visibility: hidden;
		height: 0;
		font-size: 0;
		content: ".";
		clear: both;
	}
  ```
  2. 父元素设置overflow属性。  
  3. 绝对定位。  

**[⬆ back to top](#TOC)**

# deep深度选择器

```css
> :deep(.el-tabs__content) {
    height: 100%;
    overflow-y: auto;
}   
```

**[⬆ back to top](#TOC)**

# css属性选择器

```css
[class^='el-icon-'] {
  font-size: 20px;
}
```

![](https://cdn.jsdelivr.net/gh/Leonvanx/picgo-repo/image/202202181735854.png)

常见的选择器还有：

- [attribute~=value] 选取属性值中包含指定词汇的元素
- [attribute|=value]  选取带有以指定值开头的属性值的元素，该值必须是整个单词。
- [attribute$=value] 匹配属性值以指定值结尾的每个元素
- [attribute*=value] 匹配属性值中包含指定值的每个元素

CSS组合选择器的优先级：

!important>内联样式>ID选择器>类选择器>标签选择器。

> !important会导致项目不好维护，不提倡使用。

## React和Vue中的样式隔离

1. React中使用CSS Module来实现样式隔离。

用法很简单，在CSS文件加一个.Module后缀，然后当做变量引入即可。

```react
import styles from './demo.module.css';
export default function Demo() {
  return (
    <div className={styles.myWrapper}>
      <Calendar />
    </div>
  );
}
```

```css
.myWrapper {
  border: 5px solid black;
}
```

最终编译后的文件如下，插入的样式表和元素的class属性都会加上一个哈希值作为命名空间。

```html
<style>
.demo_myWrapper__Hd9Qg {
  border: 5px solid black;
}
</style>
<div class="demo_myWrapper__Hd9Qg">
...
</div>
```

在样式隔离的情况下，当我们想要覆盖第三方UI组件的样式时，是不生效的。所以React提供了一个语法 `:global` ，被它包裹的样式会被当成全局的。

```css
/*以覆盖AntD的日期组件为例*/
:global(.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today) {
  border-color:purple; /* 覆盖为紫色 */
}
```

当使用scss或者less时，还可以使用嵌套语法。

```less
:global {
  .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today {
    border-color:purple;
  }
}
```

2. Vue中使用Scoped来实现样式隔离

用法如下，使用Scoped标记对应的CSS部分即可。

```html
<style scoped>
.myWrapper{
  border: 5px solid black
}
</style>
...
<div class="myWrapper" >
  <Calendar />
</div>
```

编译后的代码如下：

```html
<style>
.myWrapper[data-v-2fc5154c] {
  border: 5px solid black
}
</style>
<div class="myWrapper" data-v-2fc5154c>
  ...
</div>
```

可以看到它和React的CSS Module方案不同，Vue的Scoped会使CSS选择器后面加一个中括号。`.myWrapper[data-v-2fc5154c]` 代表选择拥有data-v-2fc5154c这个属性的、同时是myButton类的HTML元素。只有这个文件内部的HTML元素才会被打上data-v-2fc5154c这个属性。其余文件的HTML元素即使是myWrapper类，这个样式也不会对他生效。

回到上面React中的问题，在Vue中样式隔离的情况下想要覆盖第三方组件的样式。Vue同样给我们提供了一个类似的语法，深度作用选择器：`>>>` 。

把要“渗透“进组件内部的样式前加上`>>>`，作用域内的CSS样式都不会带上哈希值作为属性选择器。

```vue
<style scoped>
.myWrapper>>>
.ant-picker-calendar-full 
.ant-picker-panel 
.ant-picker-calendar-date-today{
  border-color:purple
}
</style>
<template>
  <div class="myWrapper" >
    <Calendar  />
  </div>
</template>
```

> 也可以将`>>>`写成`/deep/`或者`::v-deep`。
