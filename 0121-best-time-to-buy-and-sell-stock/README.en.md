121. Best Time to Buy and Sell StockEasyYou are given an array `prices` where `prices[i]` is the price of a given stock on the i⁴ day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the *maximum profit* you can achieve from this transaction. If you cannot achieve any profit, return `0`.

 

Example 1:

**Input:** prices = [7,1,5,3,6,4]
**Output:** 5
**Explanation:** Buy on the second day (price = 1) and sell on the fifth day (price = 6), profit = 6-1 = 5.
You cannot buy on the second day and sell on the first day, as you must buy before you sell.

Example 2:

**Input:** prices = [7,6,4,3,1]
**Output:** 0
**Explanation:** In this case, no transactions are done and the maximum profit = 0.

 

**Constraints:**

1 <= prices.length <= 10⁴
0 <= prices[i] <= 10⁴