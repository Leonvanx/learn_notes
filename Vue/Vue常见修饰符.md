Vue 修饰符是 Vue.js 框架中用于修改指令行为的特殊标记。它们通常以 `v-` 开头，并在指令后面用点号 `.` 连接。Vue 修饰符可以用于处理各种常见的需求，例如监听事件的修饰、表单输入的修饰等。以下是一些常见的 Vue 修饰符：

1. `.prevent`: 阻止默认行为。例如，`<form v-on:submit.prevent="onSubmit">` 会阻止表单的默认提交行为，并调用 `onSubmit` 方法。
2. `.stop`: 阻止事件冒泡。例如，`<div v-on:click.stop="onClick">` 会阻止点击事件向上冒泡，并调用 `onClick` 方法。
3. `.capture`: 使用事件捕获模式。即在事件到达目标元素之前捕获它。例如，`<div v-on:click.capture="onClick">` 会在目标元素之前捕获点击事件并调用 `onClick` 方法。
4. `.self`: 只当事件是从触发元素自身触发时触发回调。例如，`<div v-on:click.self="onClick">` 会在点击事件是由该 `<div>` 元素自身触发时才调用 `onClick` 方法。
5. `.once`: 只触发一次。例如，`<button v-on:click.once="onClick">` 会在按钮点击一次后移除事件监听器。
6. `.passive`: 指示监听器永远不会调用 `preventDefault()`。这可以用来提高滚动性能。例如，`<div v-on:touchstart.passive="onTouchStart">` 会在触摸开始时调用 `onTouchStart` 方法，但不会调用 `preventDefault()`。

这些修饰符可以单独使用，也可以组合使用，以满足不同的需求。在 Vue.js 中，修饰符是一种非常方便的方式来处理事件和指令的行为，使得代码更加简洁和易读。