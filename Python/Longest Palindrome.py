"""
Given a string s which consists of lowercase or uppercase letters, return the length of
 the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

 

Example 1:

Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
Example 2:

Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is 1.
"""
class Solution:
    def longestPalindrome(self, s: str) -> int:
        charDict = {}
        
        for i in s:
            if i in charDict:
                charDict[i] = charDict[i] +1
            else:
                charDict[i] = 1
                
        Longest= 0
        for i in charDict:
            if charDict[i] % 2 == 0:
                Longest = Longest+charDict[i]
            elif charDict[i] > 2:
                Longest = Longest+ charDict[i] - 1
                charDict[i] = 1
                
        for i in charDict:
            if charDict[i] == 1:
                Longest = Longest + 1
                break
                
        return Longest