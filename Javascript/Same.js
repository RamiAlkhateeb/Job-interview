//Frequency
function same(arr1 , arr2){
    if(arr1.length !== arr2.length)
        return false;
    //loop over array, for each number
    for(let i=0;i<arr1.length ; i++)
        {
            //check if the second array has its square
            if(arr2.indexOf(arr1[i]**2) >= 0)
            {
                //if it does, delete them both
                arr2.splice(arr2.indexOf(arr1[i]**2) ,1)
            }
        }


    if(arr2.length === 0)
        return true
    else
        return false
    
}

same([1,2,3,2],[9,4,1,4])
//[1,1,4,9].splice(2**2)

