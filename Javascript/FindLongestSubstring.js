function findLongestSubstring(str){
    
    if(str.length === 0) return 0;

    let maxLen = 0;
    let pointer1 = 0;
    let pointer2 = 1;
    let tempMaxLen = pointer2 - pointer1;
    var freqCounter = {};
    let i = 0  
    while(i < str.length) {
        let currentChar = str[i]
        freqCounter[currentChar] = i;
        
        if( freqCounter[currentChar] > 0){
            pointer1 = freqCounter[currentChar]  ;
            
            freqCounter = {};
            if ( tempMaxLen > maxLen) maxLen = tempMaxLen;
        }       
        else{
            tempMaxLen = pointer2 - pointer1;
            pointer2++;
            i++;
        } 
    }
    
    
    return maxLen
}


//findLongestSubstring('') // 0
//findLongestSubstring('rithmschool') // 7
//findLongestSubstring('thisisawesome') // 6
//findLongestSubstring('thecatinthehat') // 7
//findLongestSubstring('bbbbbb') // 1
findLongestSubstring('longestsubstring') // 8
//findLongestSubstring('thisishowwedoit') // 6
//'longestsubstring'.slice(5)