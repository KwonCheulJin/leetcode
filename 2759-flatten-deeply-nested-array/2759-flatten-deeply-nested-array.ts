type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (arr:  MultiDimensionalArray, n: number):  MultiDimensionalArray {
    return arr.reduce<MultiDimensionalArray>((acc, value) => {
        const needToFlat = Array.isArray(value) && n > 0;

        if (needToFlat) {
            acc.push(...flat(value, n - 1))
        } else {
            acc.push(value)
        }

        return acc;
    }, []);
};