/*
3. Group Users by Role
Problem Statement
You are given a list of users with roles.
Write a function that groups users by their role.
Input
const users = [
  { name: "Anil", role: "Admin" },
  { name: "Sunil", role: "User" },
  { name: "Rita", role: "Admin" },
  { name: "Karan", role: "User" },
  { name: "Pooja", role: "Manager" }
];
Expected Output
{
  Admin: ["Anil", "Rita"],
  User: ["Sunil", "Karan"],
  Manager: ["Pooja"]
} */

const users = [
  { name: "Anil", role: "Admin" },
  { name: "Sunil", role: "User" },
  { name: "Rita", role: "Admin" },
  { name: "Karan", role: "User" },
  { name: "Pooja", role: "Manager" },
];

const map = new Map();
// console.log(map.size);

const groupByRole = () => {
  users.forEach((user) => {
    let role = user.role;
    let name = user.name;

    if (map.has(role)) {
      map.set(role, [...map.get(role), name]);
    } else {
      map.set(role, [name]);
    }
  });
}; // fun end

//function call
groupByRole();

// console.log(map.size + "at end");

// print
for (let key of map.keys()) {
  console.log(key + " : [ " + map.get(key) + " ]");
}
