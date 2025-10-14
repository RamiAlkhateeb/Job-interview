/*
Given an array of integers nums, sort the array in ascending order and return it.

You must solve the problem without using any built-in functions in O(nlog(n)) 
time complexity and with the smallest space complexity possible.

Example 1:

Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Explanation: After sorting the array, the positions of some numbers are not changed
(for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).
Example 2:

Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
Explanation: Note that the values of nums are not necessairly unique.
*/
public class Solution {
    public int[] SortArray(int[] nums) {
        int[] countArrPos = new int[nums.Max()+1];
        int[] countArrNig = new int[Math.Abs(nums.Min())+1];
       
        List<int> result = new List<int>();
        for(int i = 0 ; i < nums.Length ; i++)
            if(nums[i] >= 0)
                countArrPos[nums[i]] +=1;
            else
                countArrNig[Math.Abs(nums[i])] += 1;

        
        for(int i = 0 ; i< countArrNig.Length ; i++)
            for(int j = 0 ; j < countArrNig[i] ; j++)
                result.Add(-i);
        result.Reverse();
        for(int i = 0 ; i< countArrPos.Length ; i++)
            for(int j = 0 ; j < countArrPos[i] ; j++)
                result.Add(i);
                

        return result.ToArray();
    }
}