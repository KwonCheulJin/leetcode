const symbolMap:Record<string, number> = {
    'I' : 1,
    'V' : 5,
    'X' : 10,
    'L' : 50,
    'C' : 100,
    'D' : 500,
    'M' : 1000,
}

function romanToInt(s: string): number {
    let result = 0;

    s.split('').forEach((char, i) => {
        if (char === 'I') {
            if (s[i + 1] === 'V' || s[i + 1] === 'X') {
                result -= (symbolMap[char] * 2)
            }
        }
        if (char === 'X') {
            if (s[i + 1] === 'L' || s[i + 1] === 'C') {
                result -= (symbolMap[char] * 2)
            }
        }
        if (char === 'C') {
            if (s[i + 1] === 'D' || s[i + 1] === 'M') {
                result -= (symbolMap[char] * 2)
            }
        }
        result += symbolMap[char]
    })

    return result
};