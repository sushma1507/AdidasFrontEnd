
  // Start : Custom Reduce Array Function

    const arrReducer = (initialValue, current) => {
        const [index,value] = current;
        return {...initialValue,[index]:value}
    };

    const customReduce = (reducer, initialValue, array) => {
        let value = initialValue;
        for(let i = 0; i < array.length; i++) {
            let currentValue = array[i];
            value = reducer(value, currentValue);
            console.log(value);
        }
        return value;
    }

// End : Custom Reduce Array Function

//Test Case for cutsome reduce function

function expect(result, expected) {
    const correct = (result.length!==0) && JSON.stringify(result) === JSON.stringify(expected);;
    if (correct) {
        console.info('Pass!');
    } else {
        console.error(`Failed: ${ result } does not match ${expected }`);
    }
}

//------------------------------------
    

//First Test Case
const simpleArr = [[ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ]];
const result1 = customReduce(arrReducer, {}, simpleArr)
expect(result1,{a:1,b:2,c:3})

//Second Test Case
const employeeArr = [[ 'name', 'sushma' ], [ 'age', 30 ], [ 'gender', 'Female' ]];
const result2 = customReduce(arrReducer, {}, employeeArr)
expect(result2,{name:'sushma',age:30,gender:'Female'})

   