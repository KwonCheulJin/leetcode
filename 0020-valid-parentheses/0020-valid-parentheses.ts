const pair = {
    ')' : '(',
    ']' : '[',
    '}' : '{'
}
function isValid(s: string): boolean {
    let stack = [];
    for (const ch of s) {
        if (ch === '(' || ch === '[' || ch === '{') {
            stack.push(ch)
        } else if (stack.pop() !== pair[ch]) {
            stack.push(ch)
        }
    }
    return !(stack.length > 0)
};