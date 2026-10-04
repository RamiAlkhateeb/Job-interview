// isPalindrome('awesome') // false
// isPalindrome('foobar') // false
// isPalindrome('tacocat') // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false

// Recursion
function isPalindrome(str){
    var reversed = ""
    function helperReverse(strIN) {

        if(strIN === "")
            return 
        let last = strIN.slice(strIN.length-1) 
        let rest = strIN.slice(0, strIN.length-1)
        reversed = reversed + last
        helperReverse( rest )
        
    }
    helperReverse(str)
    if (reversed === str)
        return true
    else
        return false
}