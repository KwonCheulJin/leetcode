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
    const numbers = s.split('').map(c => symbolMap[c])

    return numbers.reduce((acc, cur, i) => cur < numbers[i + 1] ? acc - cur : acc + cur, 0)
};