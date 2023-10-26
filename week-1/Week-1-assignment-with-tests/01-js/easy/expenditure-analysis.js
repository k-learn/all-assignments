/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
    
    let expenses = new Map();

    for (let i = 0; i < transactions.length; ++i) {
        const transaction = transactions[i];
        if (expenses.has(transaction.category)) {
            expenses.set(transaction.category, expenses.get(transaction.category) + transaction.price);
        } else {
            expenses.set(transaction.category, transaction.price);
        }
    }

    let answer = [];
    for (const [key, value] of expenses) {
        const obj = { category: key, totalSpent: value };
        answer.push(obj);
    }

    return answer;
}

module.exports = calculateTotalSpentByCategory;
