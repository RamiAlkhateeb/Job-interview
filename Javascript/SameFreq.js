// Frequency Problem
function sameFrequency(num1 , num2){
    // good luck. Add any arguments you deem necessary.
    var str1 = num1.toString();
    var str2 = num2.toString()
    if (str1.length !== str2.length) {
      return false;
    }
    
    const freqCounter1 = {};
    const freqCounter2 = {};
    
    for (let val of str1) {
      freqCounter1[val] = (freqCounter1[val] || 0) + 1;
    }
    
    for (let val of str2) {
      freqCounter2[val] = (freqCounter2[val] || 0) + 1;
    }
    
    for (let key in freqCounter1) {
      if (!(key in freqCounter2)) {
        return false;
      }
      
      if (freqCounter1[key] !== freqCounter2[key]) {
        return false;
      }
    }
    
    return true;
  }
  
  sameFrequency(182,128)