//Sliding window with multiple pointers
function minSubArrayLen(arr , target){
    
  let tempSum = 0;
  let minLen = arr.length;
  let pointer1 = 0;
  let pointer2 = 1;
  let tempMinLen = pointer2 - pointer1;
  
  for (let i = 0; i < arr.length; i++) {
      tempSum += arr[i];
      if (arr[i] > target) return 1;
  }

  if(tempSum < target) return 0;
  tempSum = arr[pointer1];
  
  while (pointer1 < pointer2 && pointer2 <= arr.length){
      tempMinLen = pointer2 - pointer1;
      if(tempSum >= target ){
          if( tempMinLen <= minLen) minLen = tempMinLen;
          tempSum -= arr[pointer1]  ;
          pointer1++;
      }else{
          tempSum += arr[pointer2]
          pointer2++;
      }
      
  }
  //console.log(minLen);
  return minLen;
}


//minSubArrayLen([2,3,1,2,4,3], 7) // 2 -> because [4,3] is the smallest subarray
//minSubArrayLen([2,3,1,2,4,3], 4)
//minSubArrayLen([2,1,6,5,4], 9) // 2 -> because [5,4] is the smallest subarray
//minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) // 1 -> because [62] is greater than 52
//minSubArrayLen([1,4,16,22,5,7,8,9,10],39) // 3
//minSubArrayLen([1,4,16,22,5,7,8,9,10],55) // 5
//minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11) // 2
minSubArrayLen([1,4,16,22,5,7,8,9,10],95) // 0