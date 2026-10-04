
//Multiple pointers
function isSubsequence(str1 , str2) {
    // good luck. Add any arguments you deem necessary.
      var index1= 0;
      var index2= 0;
  
      for (var i = 0;i < str2.length ; i++){
          if (str1[index1] === str2[index2] ) {
              
              index1++;
              index2++;
          }
          else index2++;
          
      }
  
      if(index1 === str1.length)
          return true;
      else
          return false;
      
      
  }
  
  console.log(isSubsequence('abc', 'acb'))
  //isSubsequence('hello', 'hello world'); // true
  //isSubsequence('sing', 'sting'); // true
  //isSubsequence('abc', 'abracadabra'); // true
  //isSubsequence('abc', 'acb');