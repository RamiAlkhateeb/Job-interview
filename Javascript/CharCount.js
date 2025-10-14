
function charCount(str){
    //make object to return
    var result = {}
    //loop over string, for each char
    for(var i=0; i <str.length;i++){
        var char = str[i].toLowerCase()
        if(/[a-z0-9]/.test(char)){
          //if it is a key in the object, add to count
            if (result[char]>0){
            result[char]++
            } else{
            //if not in the object, add it 
            result[char]=1
            }  
        }
        
    }
    //return object
    return result
}

function charCountForOF(str){
    //make object to return
    var result = {}
    //loop over string, for each char
    for(var char of str){
        char = char.toLowerCase()
        if(/[a-z0-9]/.test(char)){
          //if it is a key in the object, add to count
            if (result[char]>0){
            result[char]++
            } else{
            //if not in the object, add it 
            result[char]=1
            }  
        }
        
    }
    //return object
    return result
}

function charCountRefactor(str){
    //make object to return
    var result = {}
    //loop over string, for each char
    for(var char of str){
        char = char.toLowerCase()
        if(/[a-z0-9]/.test(char)){
          result[char] = ++result[char] || 1; 
        }
        
    }
    //return object
    return result
}

print("Hello")