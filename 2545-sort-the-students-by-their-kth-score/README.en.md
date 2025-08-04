## [2545. Sort the Students by Their Kth Score](https://leetcode.com/problems/sort-the-students-by-their-kth-score)

### Medium

There is a class of `m` students and `n` exams. A **0-indexed** `m x n` integer matrix `score` is given, where each row represents a student and `score[i][j]` is the score of the i⁴ student in the j⁴ exam. The matrix `score` contains only **distinct** integers.

Additionally, an integer `k` is given. Sort the students (i.e., the rows of the matrix) based on their scores in the k⁴ (**0-indexed**) exam in descending order.

Return the matrix after sorting.

 

**Example 1:**

```
**Input:** score = [[10,6,9,1],[7,5,11,2],[4,8,3,15]], k = 2
**Output:** [[7,5,11,2],[10,6,9,1],[4,8,3,15]]
**Explanation:** In the above diagram, S represents students and E represents exams.
- The student at index 1 scored 11 in exam 2, achieving the highest score and ranked 1st.
- The student at index 0 scored 9 in exam 2, achieving the second highest score and ranked 2nd.
- The student at index 2 scored 3 in exam 2, achieving the lowest score and ranked 3rd.
```

**Example 2:**

```
**Input:** score = [[3,4],[5,6]], k = 0
**Output:** [[5,6],[3,4]]
**Explanation:** In the above diagram, S represents students and E represents exams.
- The student at index 1 scored 5 in exam 0, achieving the highest score and ranked 1st.
- The student at index 0 scored 3 in exam 0, achieving the lowest score and ranked 2nd.
```

 

**Constraints:**

- ```m == score.length```
- ```n == score[i].length```
- ```1 1 ``
- ```score` contains **distinct** integers.``
- ```0 <= k < n```