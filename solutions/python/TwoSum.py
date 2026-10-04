"""
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
"""
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        tempDict = {}
        result = []

        if target == 0:
            for i in range(len(nums)):
                if nums[i] == 0 and len(result) < 3:
                    result.append(i)
        if len(result) <2:
            for i in nums:
                tempDict[i] = target - i
            for i in range(len(nums)):
                if nums[i] in tempDict and tempDict[nums[i]] in nums and len(result) < 2 and nums.index(tempDict[nums[i]]) != i:
                    result.append(i)
                    result.append( nums.index(tempDict[nums[i]]))
                
        return result
        