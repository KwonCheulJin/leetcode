/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let convert = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let len = convert.length;
    let middle = Math.floor(len / 2);
    for (let i = 0; i < middle; i++) {
        if (convert.charAt(i) !== convert.charAt(len - 1 - i)) {
            return false;
        }
    }
    return true
};