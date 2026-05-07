/*
2. Find Second Highest Salary
Problem Statement
Given an array of employee objects, write a function that returns the second highest salary.
Input
const employees = [
  { name: "Rahul", salary: 50000 },
  { name: "Amit", salary: 70000 },
  { name: "Neha", salary: 65000 },
  { name: "Priya", salary: 80000 },
  { name: "Vikram", salary: 70000 }
];
Expected Output
70000
*/

const employees = [
  { name: "Rahul", salary: 50000 },
  { name: "Amit", salary: 70000 },
  { name: "Neha", salary: 65000 },
  { name: "Priya", salary: 80000 },
  { name: "Vikram", salary: 70000 },
];

const salaryCalculator = () => {
  let max = Number.MIN_VALUE;
  let SecondMax = Number.MIN_VALUE;

  employees.forEach((obj) => {
    let currSalary = obj.salary;
    //update salary if curr salary is greater than max
    if (currSalary > max) {
      SecondMax = max;
      max = currSalary;
    }
    //update salary if curr salary is less than max and greater than second salary
    else if (currSalary < max && currSalary > SecondMax) {
      SecondMax = currSalary;
    }
  });

  console.log(SecondMax);
}; // fun end

salaryCalculator();
