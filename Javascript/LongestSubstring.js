function findLongestSubstring(str){
    
    if(str.length === 0) return 0;

    let maxLen = 0;
    let pointer1 = 0;
    let indexObj = {};
    let i = 0  
    while(i < str.length) {
        let currentChar = str[i]
        if( indexObj[currentChar] ){
            maxLen = Math.max(Object.keys(indexObj).length,maxLen)
            pointer1 = indexObj[currentChar] + 1  ;
            indexObj = {};
            i = pointer1;
        }       
        else{
            indexObj[currentChar] = i;
            i++;
        } 
    }
    maxLen = Math.max(Object.keys(indexObj).length,maxLen)
    //console.log(maxLen)
    return maxLen
}


findLongestSubstring('') // 0
findLongestSubstring('rithmschool') // 7
findLongestSubstring('thisisawesome') // 6
findLongestSubstring('thecatinthehat') // 7
findLongestSubstring('bbbbbb') // 1
findLongestSubstring('longestsubstring') // 8
findLongestSubstring('thisishowwedoit') // 6