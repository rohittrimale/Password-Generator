const inputSlider = document.querySelector("#slidecontainer");
const lengthDisplay = document.querySelector("#lengthDisplay");
const passwordDisplay = document.querySelector("#passwordDisplay");
const copyBtn = document.querySelector("#copyBtn");
const copyMsg = document.querySelector("#dataCopyMsg");
const uppercaseCheck = document.querySelector("#upperCase");
const lowercaseCheck = document.querySelector("#lowerCase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("#dataIndicator");
const generateBtn = document.querySelector(".generateButton");

//selected all the checkbox inside html
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

//with name create password

let showNameNDate = document.querySelector("#showNameNDate");
let nameContainer = document.querySelector("#nameContainer")
let inputName =document.querySelector("#inputName");
let inputDate = document.querySelector("#inputDate");

let password = "";
let passwordLength = 10;

let checkCount = 0;
handleSlider();
//set password length
function handleSlider()
{
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength;


}
// setIndicator();
// function setIndicator(color)
// {
// }

function getRndGenerator(min,max)
{
    console.log(Math.floor(Math.random() * (max-min))+min)
   return Math.floor(Math.random() * (max-min))+min;

}


function getRndNumber()
{
    return getRndGenerator(0,9);
}
getLowerCase();
function getLowerCase()
{
    console.log(String.fromCharCode( getRndGenerator(97,123)))
    return String.fromCharCode( getRndGenerator(97,123)); 
     
}

getUpperCase();
function getUpperCase()
{
    
    return String.fromCharCode( getRndGenerator(65,91));
     
}

function getSymbol()
{
    let randonNum = Math.random(0,symbols.length) *10;
    console.log("random value :" +Math.random(0,symbols.length))
    console.log(symbols.charAt(randonNum))
    return symbols.charAt(randonNum);
}

function calcStrength()
{

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(symbolCheck.checked) hasSymbol = true;
    if(numberCheck.checked) hasNum = true;


    if(hasUpper && hasLower && (hasNum || hasSymbol ) && passwordLength >=8)
    {
        indicator.style.backgroundColor = "blue";


    }
    else if((hasLower || hasUpper ) && (hasNum || hasSymbol) && passwordLength >=6)
    {
        indicator.style.backgroundColor = "green";


    }
    else{
        indicator.style.backgroundColor = "red";

    }

}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


async function copyContent()
{
    try{
      await  navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerHTML = "Copied";  
    }
    catch{
            copyMsg.innerHTML ="Failed";

    }

    copyMsg.style.display ="block"

    setTimeout(()=>{
        copyMsg.style.display ="none"

    },2000)
}

//checkbox 
function handleCheckBoxChange()
{

    checkCount = 0;
    allCheckBox.forEach((checkbox) => {

        if(checkbox.checked)
        {
            checkCount++;
        }
    });
    
    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }

}

allCheckBox.forEach( (checkbox)=> {
    checkbox.addEventListener('change', handleCheckBoxChange);
  });

// allCheckBox.forEach(  => {
// })


inputSlider.addEventListener('input' , (e)=>{

    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener("click" , ()=>{
    if(password.length > 0)
    {
        copyContent();
    }
})
// showNameNDate.addEventListener("click", ()=>{
//     nameContainer.style.display = "flex";
// })

// function inName()
// {
//     if(inputDate.value == "")
//     {
//         console.log("So Happy")
//     }
//     let name =  inputName.value;
//     let nameArr = name.split(" ");
//     console.log(nameArr)
// }
// function inDate(){
//     if(inputDate.value == "")
//     {
//         console.log("Happy")
//     }
//     let date = inputDate.value
//     let dateArr = date.split("-");
//     console.log("Date : "+inputDate.value)

// }

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    
    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(getUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(getLowerCase);

    if(numberCheck.checked)
        funcArr.push(getRndNumber);

    if(symbolCheck.checked)
        funcArr.push(getSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndGenerator(0 , funcArr.length);
        console.log("length : "+passwordLength-funcArr.length)
        console.log("randIndex" +  funcArr.length);

        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    //show in UI
    passwordDisplay.value = password;
    //calculate strength
    calcStrength();
});