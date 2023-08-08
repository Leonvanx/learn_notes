# TOC

[uniapp](#uniapp)

## uniapp

* uniapp页面跳转及传值

  - 不传参数

    1. navigator组件跳转

       ```XML
        <view>
       	<!-- 跳转非 tabbar 页面，有返回按钮 -->
       	<navigator url="../detail/detail">跳转详情页</navigator>
       	<!-- 跳转至 tabbar 页面 -->
       	<navigator url="../message/message" open-type="switchTab">跳转message</navigator>
       	<!-- 跳转非 tabbar 页面，无返回按钮 -->
       	<navigator url="../detail/detail" open-type="redirect">跳转detail</navigator>
       </view>
       ```

    2. API跳转

       有以下方法：

       `navigateTo` , `redirectTo` , `switchTab` , `reLaunch`。

       区别：

       > navigateTo, redirectTo 只能打开 `非 Tab` 页面，`可` 传参。
       > switchTab 只能打开 `Tab` 页面，`不可` 传参。
       > reLaunch 可以打开 `任意` 页面，`可` 传参。

       ```js
       methods: {
           fn1(){
               //保留当前页面，跳转到应用内的某个页面
               uni.navigateTo({
                   url: '/pages/drugs/drugManage'
               })
           },
           fn2(){
               //关闭当前页面，返回上一页面或多级页面。
               uni.navigateBack({
                   delta:1
               });
           },
           fn3(){
               //关闭所有页面，打开到应用内的某个页面(可带参数)
               uni.reLaunch({ 
                   url:'./home/index' 
               });
           },
           fn3(){
               //关闭当前页面，跳转到应用内的某个页面。
               uni.redirectTo({
                   url:'/pages/about/about'
               });
           },
           fn4(){
               //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
               uni.switchTab({
                   url: '../tabbor/index/index'
               });
           },
           fn5(){
               //调用第三方程序打开指定的URL
               boid plus.runtime.openURL('https://www.baidu.com/')
           }
       }
       ```

    3. 外部网页跳转

       ```xml
       <web-view src="https://baidu.rudon.cn/"></web-view>
       ```

  - 传参数
  
    1. navigator组件跳转
  
       传值页面以`?`分割，`?`后面为页面所传递的值，多个值之间以`&`间隔
  
       ```XML
       <view>
           <navigator url="../detail/detail?id=10&name=test">跳转详情页</navigator>
       </view>
       ```
  
       接受页面使用 `onLoad` 页面生命周期钩子
  
       ```js
       <script>
       	export default {
       		onLoad(options) {
           		//option为object类型，会序列化上个页面传递的参数
       			console.log(options)
       		}
       	}
       </script>
       ```
  
    2. API跳转
  
       ```javascript
       toDetail() {
       	uni.navigateTo({
       		url: '../detail/detail?id=10&name=test'
       	})
       }
       ```
  
       接收页面使用 `onLoad` 页面生命周期钩子
  
       ```js
       toDetail() {
       	uni.navigateTo({
       		url: '../detail/detail?id=10&name=test'
       	})
       }
       ```
  
       接收页面使用 `onLoad` 页面生命周期钩子
  
       > 注意，传入键值对的值为对象需要使用JSON.stringify才可以在跳转的页面接收到想要的值， 键值对的值为简单数据可以不用。
  
       

