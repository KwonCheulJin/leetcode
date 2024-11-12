/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function(jewels, stones) {
    const hashmap = new Map();
    let output = 0;
    
    for (let i = 0; i < jewels.length; i++) {
        const jewel = jewels[i];
        hashmap.set(jewel, i);
    }
    
    for (let i = 0; i < stones.length; i++) {
        const stone = stones[i];
        if(hashmap.has(stone)) output++;
    }
    
    return output;
};