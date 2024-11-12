/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    let min = Math.min(word1.length, word2.length)
    let max = Math.max(word1.length, word2.length)
    let word1Remain = word1.substring(min, max);
    let word2Remain = word2.substring(min, max);
    let result = ''
    for (let i = 0; i < min; i++) {
        let mergeStr = `${word1[i]}${word2[i]}`
        result += mergeStr
    }
    return `${result}${word1Remain}${word2Remain}`
};