/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function(s) {
    let stack = []

    for (const char of s) {
        if (char !== '*') {
            stack.push(char)
        } else if (stack.length) {
            stack.pop()
        }
    }
    return stack.join('')
};