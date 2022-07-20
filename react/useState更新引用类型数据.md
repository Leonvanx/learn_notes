# react使用useState定义状态

1. 当useState定义基本数据类型的状态时，变更state直接对原始数据进行操作就可。

   ```react
   const [flag, setFlag] = useState(false);
   setFlag(flag => !flag)
   ```

2. 当使用useState定义引用数据类型的状态时，需要返回一个新对象。

   * 数组：

   ```react
   const [state, setstate] = useState([1,2,3]);
   setstate(
     (pre)=>{
       pre.push(4);
       return [...pre]
     }
   )
   ```

   * 数组套对象：

   ```react
   const [state, setstate] = useState([{id:1},{id:2}]);
   setstate(
     (pre)=>{
       pre[i].id = 'id';
       return [...pre]
     }
   )
   ```

   * 对象：

   ```react
   const [state, setstate] = useState({name:'zhangsan'});
   setstate({
     ...state;
     state.name : newname;
   })
   ```

   * 对象数组：

   ```react
   const [state, setstate] = useState({name:'zhangsan'},arr:[1,2,3]);
   let temp = [...state.arr];
   temp.push(4);
   setstate({
     ...state;
     state.arr : temp;
   })
   ```

   > React组件的更新机制对state只进行**浅对比**

