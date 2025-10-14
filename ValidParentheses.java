/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
*/


class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        HashMap<Character,Character> map = new HashMap<Character,Character>();
        map.put('(',')');
        map.put('[',']');
        map.put('{','}');
        int left = 0;
        if(s.length() == 0)
            return true;
        if(map.containsValue(s.charAt(0)))
            return false;
        for(int i=0 ; i<s.length() ; i++)
        {
            
            //System.out.println("current character " + s.charAt(i));
            if( map.containsKey(s.charAt(i)))
            {
                stack.push(s.charAt(i));
                left++;
                //System.out.println("stack peek " + stack.peek());
                //System.out.println("stack size " + stack.size());
                //System.out.println("left " + left);
            }
            if(map.containsValue(s.charAt(i)))
            {
                if(stack.size() == 0 )
                {
                    return false;
                }
                if(stack.size()> 0)
                {
                    if(map.get(stack.peek()) == s.charAt(i))
                    {
                    //System.out.println("stack peek " + stack.peek());
                    stack.pop();
                    //System.out.println("stack size " + stack.size());
                    left--;
                    //System.out.println("left " + left);
                    continue;
                    }
                    else
                    {
                        int count = 0;
                         Stack<Character> temp = new Stack<>();
                        temp = stack;
                        for(int k=0 ; k<temp.size();k++)
                        {
                            if(map.containsValue(s.charAt(i)) && temp.pop() == s.charAt(i))
                               count++;
                        }
                        if(count == 0 )
                            return false;
                    }
                    
                }
                   
            }
        }
        if(left == 0 && stack.size()== 0)
        return true;
        else
        return false;
    }
}