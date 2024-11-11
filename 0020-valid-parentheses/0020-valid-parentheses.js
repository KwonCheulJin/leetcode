/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];
    const pair = {
        '(' : ')',
        '[' : ']',
        '{' : '}'
    }
    for (const char of s) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char)
        } else {
            const pop = stack.pop()
            if (pair[pop] !== char) {
                stack.push(char)
            }
        }
    }
    return stack.length <= 0;
};