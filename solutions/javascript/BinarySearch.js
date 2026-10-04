//Binary search

function findKey(arr , key){

    var left = 0;
    var right = arr.length-1;

    return BinarySearch(arr, key , left, right)
    

  }

function BinarySearch(arr,key, left , right){
    if(right < left ) return -1
    
    var median = left + Math.floor((right - left)/2)
    
    if (arr[median] === key) return median
    else if(arr[median] > key ) right = median-1
    else if(arr[median] < key ) left = median+1

    return BinarySearch(arr, key , left , right)

}

console.log(findKey([1,2,4,5],1))
