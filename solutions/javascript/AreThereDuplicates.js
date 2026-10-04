//Frequency
function areThereDuplicates() {


    var str = ""
    for (var i=0;i< arguments.length ; i++ )
        str += arguments[i]
  const freqCounter = {};
  console.log(str)
  for (let val of str) {
    freqCounter[val] = (freqCounter[val] || 0) + 1;
  }
  
  
  
  for (let key in freqCounter) {
    
    if (freqCounter[key] > 1) {
      return true;
    }
  }
  
  return false;
    
    
}

areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true 
areThereDuplicates('a', 'b', 'c', 'a') // true 
