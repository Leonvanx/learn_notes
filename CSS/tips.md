# TOC
  - [一些注意的点](#一些注意的点)
  - [模仿Mac浏览器滚动条样式](#模仿mac浏览器滚动条样式)
  - [定位实现居中](#定位实现居中)
  - [子元素浮动造成父元素高度塌陷问题](#子元素浮动造成父元素高度塌陷问题)


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

![](https://cdn.jsdelivr.net/gh/Leonvanx/picgo-repo/image/iShot2022-02-18 16.47.45.jpg)

常见的选择器还有：

- [attribute~=value] 选取属性值中包含指定词汇的元素
- [attribute|=value]  选取带有以指定值开头的属性值的元素，该值必须是整个单词。
- [attribute$=value] 匹配属性值以指定值结尾的每个元素
- [attribute*=value] 匹配属性值中包含指定值的每个元素

## 弹性盒子布局



