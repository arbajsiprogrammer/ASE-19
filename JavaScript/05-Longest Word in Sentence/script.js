/*
5. Longest Word in Sentence
Problem Statement
Write a function that finds the longest word in a sentence.
Input
const sentence = "JavaScript is powerful for backend and frontend development";
Expected Output
development
 */

function longestWord(sentence) {
  let start = 0;
  let end = 0;
  let maxLength = 0;
  let length = sentence.length;
  let longWord = "";

  //iterate on the string
  while (end < length) {
    let ch = sentence.charAt(end);
    let currLen = end - start;
    // found " " means end of the world
    if (ch == " ") {
      //inner block ==> for updating the longWord
      if (maxLength < currLen) {
        longWord = sentence.slice(start, end);
      }
      //update the start pointer for tracking the starting of next word
      start = end + 1;
    }

    end++;
  } //while

  if (maxLength < end - start) {
    longWord = sentence.slice(start, end);
  } //if

  return longWord;
}

const sentence = "JavaScript is powerful for backend and frontend development";
console.log("printing");

console.log(longestWord(sentence.trim()));

//we cAN also do with the split method but it will take O(N) space complexity

//2nd approach

// split sentence based on the spaces
const strArr = sentence.split(" ");

// console.log(strArr);
const calculateLongestWord = () => {
  const longWord = strArr.reduce((longStr, str) => {
    if (longStr.length > str.length) {
      return longStr;
    } else {
      return str;
    }
  });

  console.log(`Longest word calculated from split method : '${longWord}'`);
};

calculateLongestWord(strArr);
