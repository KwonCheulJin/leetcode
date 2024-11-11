/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let convert = `${x}`.split('')
    let len = convert.length;
    let middle = Math.floor(len / 2);
    for (let i = 0; i < middle; i++) {
        if (convert[i] !== convert[len - 1 - i]) {
            return false;
        }
    }
    return true
};
