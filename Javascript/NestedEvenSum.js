// Recursion problem
function nestedEvenSum (obj) {
    // add whatever parameters you deem necessary - good luck!
      var sum = 0
      function count(objIn) {
          console.log(sum)
          //console.log(objIn)
          for(var key in objIn){
              console.log(objIn[key])
              
              if (typeof objIn[key] === 'number' && objIn[key] % 2 === 0)
                  sum += objIn[key]; 
              else if(typeof objIn[key] === 'object')
                  count(objIn[key])
          }
      }
  
      count(obj)
  
      return sum
  }
  
  
  
  
  
  var obj1 = {
    outer: 2,
    obj: {
      inner: 2,
      otherObj: {
        superInner: 2,
        notANumber: true,
        alsoNotANumber: "yup"
      }
    }
  }
  
  var obj2 = {
    a: 2,
    b: {b: 2, bb: {b: 3, bb: {b: 2}}},
    c: {c: {c: 2}, cc: 'ball', ccc: 5},
    d: 1,
    e: {e: {e: 2}, ee: 'car'}
  };
  
  //nestedEvenSum(obj1); // 6
  nestedEvenSum(obj2); // 10
  