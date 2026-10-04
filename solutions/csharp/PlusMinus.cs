// Given an array of integers, calculate the ratios of its elements that are positive, negative, and zero. Print the decimal value of each fraction on a new line with  places after the decimal.

// Note: This challenge introduces precision problems. The test cases are scaled to six decimal places, though answers with absolute error of up to  are acceptable.

// Example

// There are  elements, two positive, two negative and one zero. Their ratios are ,  and . Results are printed as:

// 0.400000
// 0.400000
// 0.200000
// Function Description

// Complete the plusMinus function in the editor below.

// plusMinus has the following parameter(s):

// int arr[n]: an array of integers
// Print
// Print the ratios of positive, negative and zero values in the array. Each value should be printed on a separate line with  digits after the decimal. The function should not return a value.

// Input Format

// The first line contains an integer, , the size of the array.
// The second line contains  space-separated integers that describe .

// Constraints



// Output Format

// Print the following  lines, each to  decimals:

// proportion of positive values
// proportion of negative values
// proportion of zeros
// Sample Input

// STDIN           Function
// -----           --------
// 6               arr[] size n = 6
// -4 3 -9 0 4 1   arr = [-4, 3, -9, 0, 4, 1]
// Sample Output

// 0.500000
// 0.333333
// 0.166667
// Explanation

// There are  positive numbers,  negative numbers, and  zero in the array.
// The proportions of occurrence are positive: , negative:  and zeros: 


using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using System.Text;
using System;

class Result
{

    /*
     * Complete the 'plusMinus' function below.
     *
     * The function accepts INTEGER_ARRAY arr as parameter.
     */

    public static void plusMinus(List<int> arr)
    {
        float positives = 0;
        float negatives = 0;
        float zeros = 0;
        float n = arr.Count;
        foreach ( int i in arr){
            if(i > 0)
                positives++;
            if(i < 0)
                negatives++;
            if(i == 0)
                zeros++;
        }
            
        
        Console.WriteLine((positives/n).ToString("N6"));
        Console.WriteLine((negatives/n).ToString("N6"));
        Console.WriteLine((zeros/n).ToString("N6"));
        

    }

}

class Solution
{
    public static void Main(string[] args)
    {
        int n = Convert.ToInt32(Console.ReadLine().Trim());

        List<int> arr = Console.ReadLine().TrimEnd().Split(' ').ToList().Select(arrTemp => Convert.ToInt32(arrTemp)).ToList();

        Result.plusMinus(arr);
    }
}
