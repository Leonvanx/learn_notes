vue2 基于**Object.defineProperty** ，但是他有很多缺陷，比如 **无法监听数组基于下标的修改，不支持 Map、Set、WeakMap 和 WeakSet等缺陷** 

```vue
<template>
  <div>
    <h1>yes 可以监听 no 不可以监听</h1>
    <div>nums:{{nums}}</div>
    <button type="button" @click="handleArr('add')">数组添加</button>
    <button type="button" @click="handleArr('edit')">数组修改</button>
    <button type="button" @click="handleArr('del')">数组删除</button>
    <button type="button" @click="handleArr()">直接赋值</button>
    <p>时间:{{person.time}}</p>
    <p>问题:{{person.question}}</p>
    <p>答案:{{person.anwer}}</p>

    <button @click="handleObj('add')">新增答案属性</button>
    <button @click="handleObj('edit')">修改时间属性</button>
    <button @click="handleObj('del')">删除答案属性</button>
    <button @click="handleObj()">直接赋值</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nums: [1, 2, 3],
      person: {
        time: "00:00:00",
        question: "一起爬山么？"
      }
    };
  },
  created() {},
  methods: {
    /* yes 可以监听 no 不可以监听 */
    handleArr(type) {
      switch (type) {
        case "add":
          // this.nums.push(111, 222); //yes
          this.nums[3] = 444; //no
          break;
        case "edit":
          // this.nums.splice(1, 1, 88); //yes
          // this.$set(this.nums,1,88) //yes
          this.nums[1] = 88; //no
          break;
        case "del":
          // this.nums.shift(); //yes
          delete this.nums[0]; //no
          // this.nums.length=2 //no
          break;
        default:
          this.nums = [111, 222, 333]; //yes
          break;
      }
      console.log(this.nums);
    },
    handleObj(type) {
      switch (type) {
        case "add":
          this.person.anwer = "不了不了";
          break;
        case "edit":
          let nowDate = new Date();
          this.person.time = nowDate.toLocaleTimeString();
          // this.$set(this.person,'time',nowDate.toLocaleTimeString())
          break;
        case "del":
          delete this.person.anwer;
          break;
        default:
          this.person = {
            time: "a",
            question: "b",
            anwer: "c"
          };
          break;
      }
      console.log({ ...this.person });
    }
  }
};
</script>
```