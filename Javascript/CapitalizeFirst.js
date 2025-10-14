//Recursion
function capitalizeFirst (arr) {
    // add whatever parameters you deem necessary - good luck!
       var result = []
      function helper(arrIN) {
          if(arrIN.length === 0 ) return
          
          result.push(capitalizeFirstLetter(arrIN[0]))
          
          let rest = arrIN.slice(1)
          
          helper(rest)
          
      }
      helper(arr)
  
      return result
  }
  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']  