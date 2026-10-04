"""
Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by
 deleting some (can be none) of the characters without disturbing the relative positions
  of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).



Example 1:

Input: s = "abc", t = "ahbgdc"
Output: true
Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false
 

Constraints:

0 <= s.length <= 100
0 <= t.length <= 104
"""
class Solution:
    
    
    def isSubsequence(self, s: str, t: str) -> bool:
                
        for i in t:
            if i not in s:
                t= t.replace(i , "")
                
        for i in range(len(s)):
            if i < len(t) and s[i] != t[i]:
                t= t[:i] + t[i+1:]  
        
        print(s)     
        print(t)
              
        if t == s or s in t:
            return True
        else:
            return False