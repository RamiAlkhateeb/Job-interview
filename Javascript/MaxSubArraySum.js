//Sliding Window
function maxSubarraySum(arr, len){
    // add whatever parameters you deem necessary - good luck!
    if(len > arr.length)
      return null 
    
    var sum = 0;
    var temp = 0;
    for (var i =0;i<len;i++ )
      sum += arr[i]
  
      temp = sum
      for (var i =0;i<arr.length ; i++){
          
        sum = sum - arr[i]
        sum = sum + arr[i+len]
        if(sum > temp)
            temp = sum
      }
  
    console.log(temp)
    return temp
      
  }
  
  
  maxSubarraySum([-3,4,0,-2,6,-1], 2)// 700
  maxSubarraySum([100,200,300,400], 2) // 700
  maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)  // 39 
  maxSubarraySum([-3,4,0,-2,6,-1], 2) // 5
  maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2) // 5
  maxSubarraySum([2,3], 3) // null