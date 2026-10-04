
//Sliding window
function averagePair(arr, target){
    //determine if there is a pair of values in the array 
    //where the average of the pair equals the target average
    // add whatever parameters you deem necessary - good luck!
        // initialize pointers at the beginning and end of the array
        let left = 0;
        let right = arr.length - 1;
    
          // array to store all pairs that sum up to target
          
        while (left < right) {
            var avg = arr[left] + arr[right] / 2;
    
            if (avg === target) {
              // found a pair that sums up to target, add to pairs array
              return true;
    
              // move both pointers towards the center to find other pairs
              left++;
              right--;
            } else if (avg < target) {
              // sum is too small, move left pointer to the right
              left++;
            } else {
              // sum is too large, move right pointer to the left
              right--;
            }
        }
    
        return false
        
    }
    
    console.log(averagePair([],4))
    //averagePair([1,2,3],2.5) // true
    //averagePair([1,3,3,5,6,7,10,12,19],8) // true
    //averagePair([-1,0,3,4,5,6], 4.1) // false
    //averagePair([],4) // false