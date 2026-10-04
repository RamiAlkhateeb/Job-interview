//Recursion problem
function reverse(str) {

    var reversed = ""
     function helperReverse(strIN) {
         //console.log(strIN)
         
         if(strIN === "")
             return 
         let last = strIN.slice(strIN.length-1) 
         let rest = strIN.slice(0, strIN.length-1)
         //console.log('last and rest' , last, rest)
         reversed = reversed + last
         //console.log(reversed)
         helperReverse( rest )
         
     }
     helperReverse(str)
 
     return reversed
 }
 
 
 str = "abc"
 str = str.slice(0, str.length-1)
 //console.log(str)
 
 reverse('rithmschool') 