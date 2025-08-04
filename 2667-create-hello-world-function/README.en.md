2667. Create Hello World FunctionEasyWrite a function `createHelloWorld` that returns a new function that always returns `"Hello World"`.
 

Example 1:

**Input:** args = []
**Output:** "Hello World"
**Explanation:**
const f = createHelloWorld();
f(); // "Hello World"

The function returned by createHelloWorld should always return "Hello World".

Example 2:

**Input:** args = [{},null,42]
**Output:** "Hello World"
**Explanation:**
const f = createHelloWorld();
f({}, null, 42); // "Hello World"

The arguments passed to the function can be anything, but it should always return "Hello World".

 

**Constraints:**

- ```0 <= args.length <= 10```