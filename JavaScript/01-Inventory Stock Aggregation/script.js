/*
1. Inventory Stock Aggregation
Problem Statement
You are given a list of product transactions. Each transaction contains:
productName
type (either "purchase" or "sale")
quantity
Your task is to calculate the final stock quantity for each product.
Input
const transactions = [
  { product: "Laptop", type: "purchase", quantity: 10 },
  { product: "Mobile", type: "purchase", quantity: 20 },
  { product: "Laptop", type: "sale", quantity: 4 },
  { product: "Mobile", type: "sale", quantity: 5 },
  { product: "Tablet", type: "purchase", quantity: 7 },
  { product: "Laptop", type: "purchase", quantity: 3 }
];
 
Expected Output
{
  Laptop: 9,
  Mobile: 15,
  Tablet: 7
}
 
*/

const transactions = [
  { product: "Laptop", type: "purchase", quantity: 10 },
  { product: "Mobile", type: "purchase", quantity: 20 },
  { product: "Laptop", type: "sale", quantity: 4 },
  { product: "Mobile", type: "sale", quantity: 5 },
  { product: "Tablet", type: "purchase", quantity: 7 },
  { product: "Laptop", type: "purchase", quantity: 3 },
];

// map for storing Inventory and their respective stocks
const map = {};

const inventoryStockCalculator = () => {
  transactions.forEach((obj) => {
    if (obj.type == "purchase") {
      // map[obj.product] =
      //   map[obj.product] == undefined
      //     ? obj.quantity
      //     : map[obj.product] + obj.quantity;

      map[obj.product] = map[obj.product] + obj.quantity || obj.quantity;
    } else if (obj.type == "sale") {
      // map[obj.product] =
      //   map[obj.product] == undefined
      //     ? -obj.quantity
      //     : map[obj.product] - obj.quantity;

      map[obj.product] = map[obj.product] - obj.quantity || obj.quantity;
    }
  });
};

// calling function
inventoryStockCalculator();

// iterate on the map (obj) for printing the data
for (let key in map) {
  console.log(key + " " + map[key]);
}
