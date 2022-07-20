```vue
<template>
	<p>123</p>
</template>
<script setup>
  const pcolor = ref('#000')
</script>
<style scoped>
p{
 color:v-bind('pcolor')
}
</style>
```

在某些情况下的伪元素中的content属性似乎不生效。

```vue
<template>
  <div>
      <p>123</p>	//不生效
      <p :data-text="text">123</p>	//生效
      <p>123</p>
      <p>123</p>
      <p>123</p>
  </div>
</template>
<script setup>
	const text = ref('hello')
</script>
<style scoped>
div p:first-of-type:before{
 content:v-bind('text')	//不生效
 content:attr(data-text)	//生效
}
}
</style>
```