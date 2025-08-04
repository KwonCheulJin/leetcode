/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let current = head;

  while (current && current.next) {
    if (current.val === current.next.val) {
      // 중복된 노드 제거
      current.next = current.next.next;
    } else {
      // 다음 노드로 이동
      current = current.next;
    }
  }

  return head;
}