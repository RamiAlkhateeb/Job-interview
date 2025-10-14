"""
Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the second middle node.

 

Example 1:


Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.
Example 2:


Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
"""
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        
        linkedLength = 0
        current = dummy = ListNode(head.val)
        while head:
            linkedLength = linkedLength+1
            head = head.next
            current.next = head
            current = current.next
            
        middle = linkedLength//2

        while dummy:
            if middle > 0:
                dummy= dummy.next 
                middle = middle -1
            else:
                break
            
        return dummy