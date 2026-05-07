/*4. Find Missing Number in Sequence
Problem Statement
Given an array of numbers from 1 to N, one number is missing.
Write a function to find the missing number.
Input
const numbers = [1,2,3,4,6,7,8];
Expected Output
5 */

const numbers = [1, 2, 3, 4, 6, 7, 8];
function findMissingNumber() {
  const n = numbers.length + 1;
  // console.log(n);

  //calculate sum of first n natural numbers
  const Nsum = (n * (n + 1)) / 2;

  // calculate actual sum of the array elements
  let sum = 0;
  for (let num of numbers) {
    sum += num;
  }

  return Nsum - sum;
}

console.log("Missing Number : " + findMissingNumber());
