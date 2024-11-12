/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function(jewels, stones) {
    let jewelsKey = {}
    let count = 0;
    for (const jewel of jewels) {
        jewelsKey[jewel] = jewelsKey[jewel] ? jewelsKey[jewel] + 1 : 1
    }
    for (const stone of stones) {
        if (jewelsKey[stone]) {
            count += 1;
        }
    }
    return count;
};