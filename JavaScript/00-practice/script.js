// let z = 5 + 5;

const { Temporal } = require("@js-temporal/polyfill");

// console.log(z);

// if (Math.random() > 0.5) {
//   const y = 5;
// }

// console.log(y); // ReferenceError: y is not defined

// console.log(x === undefined); // true
// var x = 3;
// console.log(x); //3
// (function () {
//   console.log(x); // undefined
//   var x = "local value";

//   console.log(x); //local value
// })();

// console.log(x); //3

// true;
// undefined
// local value
// 3
// 3;

// const arr = [1, 2, 3, 4, 5];

// example of Reduce

// const max = arr.reduce((res, curr) => (curr > res ? curr : res));
// console.log(max);

// example of forEach
// console.log("For Each =====>>>>>");
// const forEachArr = arr.forEach((ele, i, arr) => {
//   return ele;
// });
// console.log("forEachArr " + forEachArr);

// example of map

// console.log("Map =====>>>>>");
// const newArr = arr.map((ele, i, arr) => ele * 5);
// console.log(newArr);

// console.log("Filter =====>>>>>");
// const filterArr = arr.map((ele, i, arr) => ele > 3);
// console.log(filterArr);

// const points = new Array(40, 50);
// console.log(points);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Set ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const letters = new WeakSet();
// const a = { name: "Arbaj", age: 23 };
// const b = { name: "shaikh", age: 25 };

// letters.add(a);
// letters.add(b);

// console.log(letters);

// ~~~~~~~~~~~~~~~~~~~~~~~Map~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// const map = new Map();

// map.set("a", 1);
// map.set("b", 2);

// // map.forEach((ele) => console.log(ele));

// for (let key of map.keys()) {
//   console.log(map.get(key) + "=");
// }

// const text =
//   '{"name":"John", "age":"function() {return 30;}", "city":"New York"}';
// const obj = JSON.parse(text);
// obj.age = eval("(" + obj.age + ")");

// console.log(obj.age());

// console.log(NaN === NaN);

// const json = {
//   data: [
//     {
//       stuff: [
//         {
//           onetype: [
//             { id: 1, name: "John Doe" },
//             { id: 2, name: "Don Joeh" },
//           ],
//         },
//         { othertype: [{ id: 2, company: "ACME" }] },
//       ],
//     },
//     {
//       otherstuff: [
//         {
//           thing: [
//             [1, 42],
//             [2, 2],
//           ],
//         },
//       ],
//     },
//   ],
// };

// const arr1 = [1, 2, [3, [4], [6, [7, 8]]]];

// const strArr = arr1.toString();

// console.log(arr1.flat(Infinity));

// Create an empty Map
// const fruits = new Map();

// // Set Map Values
// fruits.set("apples", 500);
// fruits.set("bananas", 300);
// fruits.set("oranges", 200);

// console.log(Number(fruits.get("mango")));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Date ~~~~~~~~~~~~~~~~~~~~~~~~`

// let date = new Date().toLocaleTimeString();
//console.log(Date.UTC(date.toString()));
// console.log(date);

// const birthday = new Date("August 19, 1975 23:15:30");
// const birthDate = birthday.getDate();

// console.log(birthDate);

// ~~~~~~~~~~~~~~~~~~~~~~~~ Temporal ~~~~~~~~~~~~~~~~~~~~~~

// import { Temporal } from "@js-temporal/polyfill";

// console.log(Temporal.Duration.from({ days: 7 }).toString());

// since method
// const zdt1 = Temporal.Now.zonedDateTimeISO();

// setTimeout(() => {
//   const zdt2 = Temporal.Now.zonedDateTimeISO();
//   const Duration = zdt2.since(zdt1);
//   console.log(Duration.toString());
// }, 1000);

// Instant method
// const instant = Temporal.Now.instant();
// console.log(instant.toString());
// const zoned = instant.toZonedDateTimeISO("Europe/Oslo");
// console.log(zoned.toString());

// ADD method
// const myDate = Temporal.PlainDate.from("2026-02-01");

// const addDate = myDate.add({ days: 30 });

// console.log(addDate.toString());

// const reduceDate = myDate.subtract({ days: 10 });
// console.log(reduceDate.toString());

// (() => {
//   console.log("hello world");
// })();

// const now = Temporal.Now.plainDateTimeISO();
// console.log(now.toString());

// const now2 = Temporal.PlainDateTime.from("2026-12-12");

// const since = now.until(now2);
// console.log(since.round({ smallestUnit: "minutes" }).toString());

/*Count Character Frequency
Input: "banana"
*/

// const map = new Map();
// const str = "banana";

// for (let ch of str) {
//   if (map.has(ch)) {
//     map.set(ch, map.get(ch) + 1);
//   } else {
//     map.set(ch, 1);
//   }
// }

// for (let key of map.keys()) {
//   console.log(key + " " + map.get(key));
// }
/*Double Every Number using map()
[1,2,3]

Output:

[2,4,6] */

// const arr = [1, 2, 3];
// const result = arr.map((ele) => ele * 2);

// for (let ele of result) {
//   console.log(ele);
// }

/*
Filter Even Numbers
[1,2,3,4,5,6]

Output:

[2,4,6] */

// const arr = [1, 2, 3, 4, 5, 6];
// const result = arr.filter((e) => e % 2 == 0);
// for (let ele of result) {
//   console.log(ele);
// }

/*
Sum using reduce()
[10,20,30]

Output: 60
 */

// const arr = [10, 20, 30];
// const result = arr.reduce((result, ele) => result + ele);
// console.log(result);

/*
Get Names from Object Array
[
 {name:"Ali", age:20},
 {name:"John", age:25}
]

Output:

["Ali","John"]
 */

// const arr = [
//   { name: "Ali", age: 20 },
//   { name: "John", age: 25 },
// ];

// const result = arr.map((ele) => ele.name);
// console.log(result);

// const arr = [
//   { name: "Ali", age: 20 },
//   { name: "John", age: 25 },
// ];
// console.log(Object.entries(arr[0]));

/*Get Current Date Format

Output:

27-04-2026 */

// const now = new Date();
// const date = now.getDate();
// const month = now.getMonth();
// const year = now.getFullYear();
// console.log(date + "-" + month + "-" + year);

// const arr = [1, 2, 3, 4];

// for (let a of arr) {
//   console.log(a);
// }

// const now = Temporal.Now.plainDateISO();
// const date = now.day;
// const month = now.month;
// const year = now.year;
// console.log(date.toString() + "-" + month.toString() + "-" + year.toString());
// console.log(now.toString());

var a = Math.max() < Math.min();
var b = Math.max() > Math.min();
console.log(Math.max(), "Math.max() ");
console.log(Math.min(), "Math.min()");
