// Recursion problem, apply exprssion to array items
function someRecursive(arr , exprssion){
    // add whatever parameters you deem necessary - good luck!
    //console.log(exprssion(7))
      console.log(arr)
      if(arr.length === 0) return false
      if(exprssion(arr[0])) return true
  
      return someRecursive(arr.slice(1) , exprssion)
      
  }
  
  // SAMPLE INPUT / OUTPUT
  const isOdd = val => val % 2 !== 0;
  [1,2,3,4].slice(1)
  
  someRecursive([1,12,3,11], val => val > 10) // true
  someRecursive([4,6,8,9], isOdd) // true
  someRecursive([4,6,8], isOdd) // false
  someRecursive([4,6,8], val => val > 10); // false