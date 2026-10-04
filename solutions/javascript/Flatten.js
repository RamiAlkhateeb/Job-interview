// Recursion problem
function flatten(arr){
    // add whatever parameters you deem necessary - good luck!
      var result = []
      function helper(arrIN) {
          console.log(arrIN)
          if(arrIN.length === 0 ) return
          
          if(!Array.isArray(arrIN[0]) ) result.push(arrIN[0])
          else helper( arrIN[0] )
          
          let rest = arrIN.slice(1)
          
          helper(rest)
          
      }
      helper(arr)
  
      return result
  }
  
  //var ss= [2,5]
  //ss.push(1)
  //console.log(ss.slice(1))
  
  flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
  // flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
  // flatten([[1],[2],[3]]) // [1,2,3]
  // flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3