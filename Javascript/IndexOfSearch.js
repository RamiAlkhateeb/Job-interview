//Linear search

function indexOfArr(arr , key){
    for (let i = 0 ; i < arr.length; i++)
        if (arr[i] === key)
            return i
    
    return -1

  }

console.log(indexOfArr([1,2,4,5],2))
