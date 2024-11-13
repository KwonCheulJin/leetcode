/**
 * @return {Function}
 */
var createHelloWorld = function() {
    let word = 'Hello World';
    return function(...args) {
        return word;
    }
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */