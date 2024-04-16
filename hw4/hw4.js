
// consts for approach various pages. will be used to hide and show pages.
// js will show page depending on pageNum
const loginP = document.getElementById('loginPage');
const loginS = document.getElementById('loginSuccess');
const signP = document.getElementById('signPage');
const signS = document.getElementById('signSuccess');

// const loginButton = document.getElementById('login-button');
// const signButton = document.getElementById('sign-button');
let pageNum =0;

//initialize what page to show in default.
loginP.style.display = 'block';
signP.style.display = 'none';

loginS.style.display = 'none';
signS.style.display = 'none';

//page changing function. will go to what num tells us to.

function changePage(num) {
    // Fade out all pages first
    [loginP, loginS, signP, signS].forEach(page => {
        page.classList.add('fade-effect'); // Ensure the fade effect is ready
        page.classList.remove('fade-in'); // This will start the fade-out
    });

    //for changing color of buttons
    const loginButton1 = document.getElementById('login-button1');
    const signButton1 = document.getElementById('sign-button1');
    const loginButton2 = document.getElementById('login-button2');
    const signButton2 = document.getElementById('sign-button2');

    // After the fade out, display none and fade in the next page
    setTimeout(() => {
        // Hide all pages
        [loginP, loginS, signP, signS].forEach(page => {
            page.style.display = 'none';
        });

        // Determine which page to show based on 'num'
        let pageToShow;
        if (num === 0) {
            pageToShow = loginP;

            //if login is pressed login button color change
            loginButton1.style.backgroundColor = 'grey';
            signButton1.style.backgroundColor = 'white';
            loginButton2.style.backgroundColor = 'grey';
            signButton2.style.backgroundColor = 'white';

        } else if (num === 1) {
            pageToShow = signP;

            //if sign up button is pressed sign up button color change
            signButton1.style.backgroundColor = 'grey';
            loginButton1.style.backgroundColor = 'white';
            signButton2.style.backgroundColor = 'grey';
            loginButton2.style.backgroundColor = 'white';
        } else if (num === 2) {
            pageToShow = signS;
        } else {
            pageToShow = loginS;
        }

        // Prepare the page to be shown
        pageToShow.style.display = 'block';
        // Trigger reflow to ensure the transition will take place
        pageToShow.offsetWidth;

        // Add the class to start the fade-in
        pageToShow.classList.add('fade-in');

    }, 500); // This timeout duration should match the CSS transition-duration
}

// Call this function to initialize the first page
changePage(0);


//many consts for get input datas. will be used to check if the inputs are correct.
//const for error messages. will be shown if there are errors in input.
const signForm = document.getElementById("sign-form");
const signFirstName = document.getElementById("sign-first-name");
const errorFirstName = document.getElementById("error-first-name");
const signLastName = document.getElementById("sign-last-name");
const errorLastName = document.getElementById("error-last-name");

const errorFirstNameNumber = document.getElementById("error-first-name-number");
const errorLastNameNumber = document.getElementById("error-last-name-number");

const radioInputs = document.getElementsByName("radio-input");
const errorRadio = document.getElementById("error-radio");

const signEmail= document.getElementById("sign-email");
const errorEmail = document.getElementById("error-email");
const errorEmailInvalid = document.getElementById("error-email-invalid");

const signPassword = document.getElementById("sign-password");
const errorPassword = document.getElementById("error-password");
const errorPasswordInvalid = document.getElementById("error-password-invalid");

const signConfirmPassword = document.getElementById("sign-confirm-password");
const errorConfirmPassword = document.getElementById("error-confirm-password");
const errorConfirmPasswordInvalid = document.getElementById("error-confirm-password-invalid");

// variables for checking whether it is ok to submit. will check all the criteria are met.
// if not decline page change.
let firstNameCheck =false;
let lastNameCheck = false;
let genderCheck = false;
let emailCheck = false;
let passwordCheck = false;
let confirmPasswordCheck = false;

// checking submit button criteria
signForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //11-19
    // if first name is empty print error
    if(!signFirstName.value || !isNaN(signFirstName.value)){
        signFirstName.style = "border: 1px solid red";
        errorFirstName.style = "display: inline"
        firstNameCheck = false;
    }
    else{
        signFirstName.style = "border: 1px solid grey";
        errorFirstName.style = "display: none"
    }


    //if last name is empty print error
    if(!signLastName.value){
        signLastName.style = "border: 1px solid red";
        errorLastName.style = "display: inline"
        lastNameCheck = false;
    }
    else{
        signLastName.style = "border: 1px solid grey";
        errorLastName.style = "display: none"
    }

    //gender button check
    let checkRadio;
    radioInputs.forEach((v) =>{
        if(v.checked){
            checkRadio = v;
        }
    });
    if(!checkRadio){
        errorRadio.style = "display:inline";
        genderCheck = false;
    }
    else{
        errorRadio.style = "display:none";
        genderCheck = true;
    }

    // email empty check
    if(!signEmail.value){
        signEmail.style = "border: 1px solid red";
        errorEmail.style = "display: inline"
        emailCheck = false;
    }
    else{
        signEmail.style = "border: 1px solid grey";
        errorEmail.style = "display: none"
    }

    //password empty check
    if(!signPassword.value){
        signPassword.style = "border: 1px solid red";
        errorPassword.style = "display: inline"
        passwordCheck = false;
    }
    else{
        signPassword.style = "border: 1px solid grey";
        errorPassword.style = "display: none"
    }

    //confirm password empty check
    if(!signConfirmPassword.value){
        signConfirmPassword.style = "border: 1px solid red";
        errorConfirmPassword.style = "display: inline"
        confirmPasswordCheck = false;
    }
    else{
        signConfirmPassword.style = "border: 1px solid grey";
        errorConfirmPassword.style = "display: none"
    }

    // check if everything is right
    if(firstNameCheck && lastNameCheck && genderCheck && passwordCheck && confirmPasswordCheck && emailCheck ){
        // alert("sign up ok");

        localStorage.setItem("email", signEmail.value);
        localStorage.setItem("password", signPassword.value);

        // if correct go to next page
        changePage(2);
    }
});

//check if input is correct, no numbers in name
signFirstName.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    //11-19
    const firstNamePattern = /^[A-Z][a-zA-Z]*$/;

    signFirstName.style = "border: 1px solid grey";
    errorFirstName.style = "display: none"

    //compare them with regex will be repeated
    // if not hide the error message and show green checkmark
    if(!firstNamePattern.test(inputValue)){
        signFirstName.style = "border: 1px solid red";
        errorFirstNameNumber.style = "display:inline";
        firstNameCheck = false;

        //11-20
        document.getElementById("first-name-checkmark").style.visibility = 'hidden';
    }
    else{
        signFirstName.style = "border: 1px solid grey";
        errorFirstNameNumber.style = "display:none";
        firstNameCheck = true;

        document.getElementById("first-name-checkmark").textContent ='✓'
        document.getElementById("first-name-checkmark").style.visibility = 'visible';
    }
});

//check if input is correct, no numbers in name
// same as first name
// used regex
signLastName.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    signLastName.style = "border: 1px solid grey";
    errorLastName.style = "display: none"

    const lastNamePattern = /^[A-Z][a-zA-Z]*$/;

    //repeated
    if(!lastNamePattern.test(inputValue)){
        signLastName.style = "border: 1px solid red";
        errorLastNameNumber.style = "display:inline";
        lastNameCheck = false;

        //11-20
        document.getElementById("last-name-checkmark").style.visibility = 'hidden';
    }
    else{
        signLastName.style = "border: 1px solid grey";
        errorLastNameNumber.style = "display:none";
        lastNameCheck = true;

        document.getElementById("last-name-checkmark").textContent ='✓'
        document.getElementById("last-name-checkmark").style.visibility = 'visible';
    }
});

//11-19
//gender empty checking
radioInputs.forEach((radioInput) => {
    radioInput.addEventListener("change", (e) => {
        // If any radio button is selected, hide the error message

        //11-20
        document.getElementById("gender-checkmark").style.visibility = 'hidden';

        if(e.target.checked){
            errorRadio.style.display = "none";
            genderCheck = true;

        document.getElementById("gender-checkmark").textContent ='✓'
        document.getElementById("gender-checkmark").style.visibility = 'visible';
        }
    });
});

// email input check, used regex
// used regex generator
signEmail.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    signEmail.style = "border: 1px solid grey";
    errorEmail.style = "display: none"

    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/;

    // if not regex compatible, print error message
    if(!emailPattern.test(inputValue)){
        signEmail.style = "border: 1px solid red";
        errorEmailInvalid.style = "display:inline";
        emailCheck=false;

        //11-20
        document.getElementById("email-checkmark").style.visibility = 'hidden';
    }
    else{
        signEmail.style = "border: 1px solid grey";
        errorEmailInvalid.style = "display:none";
        emailCheck=true;

        document.getElementById("email-checkmark").textContent ='✓'
        document.getElementById("email-checkmark").style.visibility = 'visible';
    }

    console.log(emailPattern.test(inputValue));
});
// https://regexr.com/

// same as email, just with passwords
signPassword.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    signPassword.style = "border: 1px solid grey";
    errorPassword.style = "display: none"

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // if not regex compatible, print error
    if(!passwordPattern.test(inputValue)){
        signPassword.style = "border: 1px solid red";
        errorPasswordInvalid.style = "display:inline";
        passwordCheck=false;

        //11-20
        document.getElementById("password-checkmark").style.visibility = 'hidden';
    }
    else{
        signPassword.style = "border: 1px solid grey";
        errorPasswordInvalid.style = "display:none";
        passwordCheck=true;

        document.getElementById("password-checkmark").textContent ='✓'
        document.getElementById("password-checkmark").style.visibility = 'visible';
    }

    console.log(emailPattern.test(inputValue));
});

// check if input value is same with the previous value.
signConfirmPassword.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    signConfirmPassword.style = "border: 1px solid grey";
    errorConfirmPassword.style = "display: none"

    //compare two passwords
    if(inputValue !== signPassword.value){
        signConfirmPassword.style = "border: 1px solid red";
        errorConfirmPasswordInvalid.style = "display:inline";
        confirmPasswordCheck=false;

        //11-20
        document.getElementById("confirm-password-checkmark").style.visibility = 'hidden';
    }
    else{
        signConfirmPassword.style = "border: 1px solid grey";
        errorConfirmPasswordInvalid.style = "display:none";
        confirmPasswordCheck=true;

        document.getElementById("confirm-password-checkmark").textContent ='✓'
        document.getElementById("confirm-password-checkmark").style.visibility = 'visible';
    }

    console.log(emailPattern.test(inputValue));
});

// consts for login page, comparing correct email, password with inputs
// also variables for controlling error messages that are hidden.
const loginForm = document.getElementById("login-form");

const loginEmail= document.getElementById("login-email");
const loginErrorEmail = document.getElementById("login-error-email");
const loginErrorEmailInvalid = document.getElementById("login-error-email-invalid");

const loginPassword = document.getElementById("login-password");
const loginErrorPassword = document.getElementById("login-error-password");
const loginErrorPasswordInvalid = document.getElementById("login-error-password-invalid");

// submit button is login button.
// checking whether it is correct email and password
// if not show the hidden warning message 
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // correct email and password are stored in local storage.
    const localEmail = localStorage.getItem("email");
    const localPassword = localStorage.getItem("password");

    //email password check
    if(loginEmail.value === localEmail && loginPassword.value === localPassword){
        // alert("login ok");
        changePage(3);
    }
    else{
        const wrongEmail = document.getElementById("wrong-email");
        wrongEmail.style = "display: inline"
        const startEmail = document.getElementById("enter-email");
        startEmail.style = "display: none"
    }


    console.log(localEmail);
    console.log(localPassword);
    console.log(loginEmail.value);
    console.log(loginPassword.value);
})

//checking email format, same as signup email check. used regex
loginEmail.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailPattern.test(inputValue)){
        loginEmail.style = "border: 1px solid red";
        loginErrorEmailInvalid.style = "display:inline";

        //11-20
        document.getElementById("login-email-checkmark").style.visibility = 'hidden';
    }
    else{
        loginEmail.style = "border: 1px solid grey";
        loginErrorEmailInvalid.style = "display:none";

        document.getElementById("login-email-checkmark").textContent ='✓'
        document.getElementById("login-email-checkmark").style.visibility = 'visible';
    }

    console.log(emailPattern.test(inputValue));
});
// https://regexr.com/

// checking whether password is empty
loginPassword.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    if(!loginPassword.value){
        loginPassword.style = "border: 1px solid red";
        loginErrorPasswordInvalid.style = "display:inline";

        //11-20
        document.getElementById("login-password-checkmark").style.visibility = 'hidden';
    }
    else{
        loginPassword.style = "border: 1px solid grey";
        loginErrorPasswordInvalid.style = "display:none";

        document.getElementById("login-password-checkmark").textContent ='✓'
        document.getElementById("login-password-checkmark").style.visibility = 'visible';
    }


    console.log(emailPattern.test(inputValue));
});

// video showed that if i click the password box, it immediately show error message
// so i added click listener to show error message.
loginPassword.addEventListener("click", (e) => {
    const inputValue = e.target.value;

    if(!loginPassword.value){
        loginPassword.style = "border: 1px solid red";
        loginErrorPasswordInvalid.style = "display:inline";
    }
    else{
        loginPassword.style = "border: 1px solid grey";
        loginErrorPasswordInvalid.style = "display:none";
    }


    console.log(emailPattern.test(inputValue));
});