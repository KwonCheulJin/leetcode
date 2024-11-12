/**
 * @param {string} s
 * @return {number}
 */
var scoreOfString = function(s) {
    let charNums = [];
    for (let char of s) {
        charNums.push(char.charCodeAt())
    }
    let sum = 0;
    for (let i = 0; i < charNums.length - 1; i++) {
            let calc = Math.abs(charNums[i] - charNums[i + 1])
            sum += calc
    }
    return sum
};