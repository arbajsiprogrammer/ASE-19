/*6. Array Flattening (Nested Arrays)
Problem Statement
You are given a nested array containing numbers at different depths.
Write a function to flatten the array into a single array.
Input
const arr = [1, [2, [3, 4], 5], [6, 7], 8];
Expected Output
[1,2,3,4,5,6,7,8] */

const arr = [1, [2, [3, 4], 5], [6, 7], 8];

let text = "";
flatten(arr);
// recursive approach
recursiveFlatten(arr);

function flatten(arr) {
  let n = arr.length;
  console.log("output from flatten");

  console.log(arr.flat(Infinity));
}

function recursiveFlatten(arr) {
  for (let num of arr) {
    if (Array.isArray(num)) {
      recursiveFlatten(num);
    } else {
      text = text + " " + num;
      //   console.log(num);
    }
  }
}

console.log("output from the recursiveFlatten");
console.log(text);
