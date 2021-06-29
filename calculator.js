//Function which returns precedance
function precedence(character){
    if(character=='*' || character=='/')
         return 3;
    else if(character=='+' || character=='-')
        return 2;
    else
        return 0;
}

//Calculator function
function calcString(inputString){
    let number1 = 0;
    let number2 = 0;
    let flag=true;
    let result =0;
    let position1=0;
    let position2=0;
   
    while(flag) {
        flag=false;        
        let index=0;
        let tempPrecedance =0;

        //Returning the expression which is not having any operator
        if(inputString.indexOf('*')===-1 && inputString.indexOf('/')===-1 && inputString.indexOf('+')===-1 && inputString.indexOf('-')===-1){
            return parseFloat(inputString);
        }
        //---------------------------------------------------

        for(let i=0;i<inputString.length;i++) {
            //Returning 0 if expression having only one  operator
            if(i==0 && (inputString.charAt(i)==='+' || inputString.charAt(i)==='-')){
                let newString =inputString.substring(i+1,inputString.length);
                if(newString.indexOf('*')===-1 && newString.indexOf('/')===-1 && newString.indexOf('+')===-1 && newString.indexOf('-')===-1){
                    return 0;
                }
            }
            //---------------------------------------

            //Skipping numbers and . for precendance checking and if first character is negative
            if(inputString.charAt(i)>=0 || inputString.charAt(i)<=9 || inputString.charAt(i)=='.' || (inputString.charAt(i)=='-' && i==0))
            continue;
          
            if(precedence(inputString.charAt(i))>tempPrecedance ) {
                index = i;
                tempPrecedance = precedence(inputString.charAt(i));
            }      
        }
        let str='';
        let str1='';
        let str2='';
        //Finding the first number before the operator
        for(let k=index-1;k>=0 && ((inputString.charAt(k)>=0 || inputString.charAt(k)<=9) || inputString.charAt(k)=='.' || (inputString.charAt(k)=='-' && k==0));k--) {
            str+=inputString.charAt(k);
            position1=k;
        }

        //Reverse the String if having more than one digits
        for(let k=str.length-1;k>=0;k--) {
            str1+=str.charAt(k);
        }
        //---------------------------------------------------

        //Finding the next number after the operator
        for(let k=index+1;k<=inputString.length && ((inputString.charAt(k)>=0 || inputString.charAt(k)<=9) || inputString.charAt(k)=='.' ||(inputString.charAt(k)=='-' && k==0));k++) {
            str2+=inputString.charAt(k);
            position2=k;
        }
        //----------------------------------------------------
         
        //Retrieving the number not the string
        try{
            number1 = parseFloat(str1);
            number2 = parseFloat(str2);

        }catch(e){
            console.log(e);
        }
        //---------------------------------

        //Calculating the operation based on operator
        switch(inputString.charAt(index)){
            case '+': result =number1+number2;
                      break;
            case '-': result =number1-number2;
                      break;
            case '*': result =number1*number2;
                      break;
            case '/': if(number2==0)
                      break;
                      result=number1/number2;
                      break;
        }
        //-------------------------------------------

        if(position1!=0 || position2!=0) {
            let res = result.toString();
            if(((res.substring(res.indexOf(".")+1) === 0)))
                res= res.substring(0,res.indexOf('.'));
                inputString=inputString.substring(0,position1)+res+inputString.substring(position2+1,inputString.length)
        }
        else {
            break;
        }
        for(let k=0;k<inputString.length;k++) {
            if(inputString.charAt(k)=='-' && k==0){
                flag=false;
            }
            else if(inputString.charAt(k)=='+' || inputString.charAt(k)=='-' || inputString.charAt(k)=='*' || inputString.charAt(k)== '/'){
                flag=true;
            }
        }      
    }
    //console.log(inputString);
    let finalResult = parseFloat(inputString);
    return finalResult;
}

function expect(result, expected) {
    const correct = !isNaN(result) && result === expected;
    if (correct) {
        console.info('Correct!');
    } else {
        console.error(`Error: ${ result } does not match ${expected }`);
    }
}

expect(calcString('1 + 1'), 2);
expect(calcString('1 - 1'), 0);
expect(calcString('2+ 2'), 4);
expect(calcString('2+ 5-3'), 4);
expect(calcString('2+ 5-3 -6'), -2);
expect(calcString('1'), 1);
expect(calcString('+1'), 0);
expect(calcString('2 * 2'), 4);
expect(calcString('2 * 2.4'), 4.8);
expect(calcString('21 + 1'), 22);
expect(calcString('0 - 1'), -1);
expect(calcString('1 + 1 * 2'), 3);
expect(calcString('1 + 1 / 2'), 1.5);
expect(calcString('+ 1 * 1 + 1 / 2'), 1.5);
expect(calcString('1 + + 1'), 2);
expect(calcString('1 + - 1'), 0);