// Recursion problem
function stringifyNumbers (obj) {
    // add whatever parameters you deem necessary - good luck!
    // add whatever parameters you deem necessary - good luck!
      
      var newObj = {}
      function stringify(objIn) {
          //console.log(objIn)
          for(var key in objIn){
              newObj[key] = objIn[key]
              if (typeof newObj[key] === 'number')
                  newObj[key] =  newObj[key].toString(); 
              else if(typeof newObj[key] === 'object'){
                  stringify(newObj[key])
              }
          }
      }
  
      stringify(obj)
      return newObj
  
  }
  
  
  let obj = {
      num: 1,
      test: [],
      data: {
          val: 4,
          info: {
              isRight: true,
              random: 66
          }
      }
  }
  
  
  console.log(stringifyNumbers(obj))
  /*
  {
      num: "1",
      test: [],
      data: {
          val: "4",
          info: {
              isRight: true,
              random: "66"
          }
      }
  }
  */