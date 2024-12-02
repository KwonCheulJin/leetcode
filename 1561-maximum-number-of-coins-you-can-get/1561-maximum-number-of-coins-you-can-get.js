/**
 * @param {number[]} piles
 * @return {number}
 */
var maxCoins = function(piles) {
    let count = 0;
    piles.sort((a, b) => b - a)
    let len = piles.length / 3

    for (let i = 1; i < piles.length - len; i += 2) {
        count += piles[i]
    }
    return count;
};