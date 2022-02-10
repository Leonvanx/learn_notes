# Catalogs
1. [一些注意的点](#一些注意的点)

2. [模仿Mac浏览器滚动条样式](#模仿Mac浏览器滚动条样式)

3. [定位实现居中](#定位实现居中)  
   

## 一些注意的点
1. 为第一个子元素设置margin-top时，会作用到父元素上导致上外边距溢出，解决办法：通过伪类给子元素增加一个空的table元素，或者改用padding-top。
2. 利用定位实现子元素的偏移时，父元素请设置对应宽高，否则效果可能不如预期.

**[⬆ back to top](#catalogs)**

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
**[⬆ back to top](#catalogs)**

## 定位实现居中
> 水平垂直居中

```css
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
**[⬆ back to top](#catalogs)**


