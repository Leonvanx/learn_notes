// let oldArr = [
//     {
//         a:'1',
//         b:'2'
//     }
// ];
// let newArr = oldArr.map(item =>{
//     return {
//         key1:item.a,
//         key2:item.b
//     }
// });
// console.log(newArr)
function add(x, y, z) {
    return x + y - z;
}

const numbers = [4, 38, 45];
console.log(add(...numbers));