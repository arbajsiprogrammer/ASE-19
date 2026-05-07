// const customPromise = function (data) {
//   if (data) {
//     return new Promise((resolve, reject) => {
//       return resolve(`${data} received`);
//     });
//   } else {
//     return new Promise((resolve, reject) => {
//       return reject(`data not found`);
//     });
//   }
// };

// const customPromise = function (data) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (data) {
//         resolve(`${data} received`);
//       } else {
//         reject(`data not found`);
//       }
//     }, 2000);
//   });
// };

// Promise chaining
// customPromise(123)
//   .then((resolveMessage) => {
//     console.log(resolveMessage);

//     // 2nd
//     customPromise(456).then((resolveMessage) => {
//       console.log(resolveMessage);

//       //3rd
//       customPromise(678).then((resolveMessage) => {
//         console.log(resolveMessage);

//         //4th
//         customPromise().then((resolveMessage) => {
//           console.log(resolveMessage);
//         });
//       });
//     });
//   })
//   .catch((rejectMessage) => {
//     console.log(rejectMessage);
//   });

// ```````````````````````Promise chaining ``````````````````````````````````

// customPromise(123)
//   .then((resolveMessage) => {
//     console.log(resolveMessage);
//     return customPromise(456);
//   })
//   .then((resolveMessage) => {
//     console.log(resolveMessage);
//     return customPromise();
//   })
//   .then((rejectMessage) => {
//     // this block never execute
//     console.log(rejectMessage);

//     return customPromise(789);
//   })
//   .catch((rejectMessage) => {
//     console.log(rejectMessage);
//   });

// ``````````````try cath `````````````Error handling ````````````
/* json data parser ==> Write a function that:
Takes a JSON string
Parses it using JSON.parse
If parsing fails → return "Invalid JSON"
Otherwise → return parsed object
*/
// function safeParse(jsonString) {
//   try {
//     return JSON.parse(jsonString);
//     // return response;
//   } catch (error) {
//     return "Invalid JSON";
//   }
// }

// const jsonObj = '{"name":"arbaj"}';
// console.log(safeParse(jsonObj)); //{"name":"arbaj"}
// console.log(safeParse("name")); //Invalid JSON

/*
example 02 Create a function withdraw(amount, balance):

If amount > balance → throw error "Insufficient balance"
If amount < 0 → throw "Invalid amount"
Else return remaining balance
*/

// function withdraw(amount, balance) {
//   if (amount > balance) {
//     throw new Error("Insufficient balance");
//   } else if (amount <= 0) {
//     throw new Error("Invalid amount");
//   } else {
//     return balance - amount;
//   }
// }

// try {
//   // console.log(withdraw(1000, 200)); // ("Insufficient balance");
//   console.log(withdraw(-1, 200)); // Invalid amount
//   console.log(withdraw(200, 1000)); //800
// } catch (error) {
//   console.log(error.message);
// }

// Promise + Error Handling

// lets fix the bugs in the below code

function fetchUsers(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        console.log(url);

        resolve("Data Fetched...");
      } else {
        reject("Request Rejected");
      }
    }, 2000);
  });
}
console.log("fetch users calling ");

fetchUsers("url")
  .then((message) => console.log(message + "..."))
  .catch((errMessage) => console.log(errMessage));
