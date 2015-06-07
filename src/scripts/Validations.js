function checkDate() {


}

function checkMailNotEmpty(){

    if(document.signupform.Email.value ==""){

        document.signupform.Email.focus();
    }
}

function checkMail(){

    document.signupform.ReEmail.setCustomValidity('');

    if (document.signupform.ReEmail.value != document.signupform.Email.value){

        document.signupform.ReEmail.setCustomValidity("E-mail and Confirm E-mail fields don't match!")
    }
}

function checkPassNotEmpty(){

    if(document.signupform.Password.value ==""){

        document.signupform.Password.focus();
    }
}

function checkPass(){

    document.signupform.PasswordConfirm.setCustomValidity('');

    if (document.signupform.PasswordConfirm.value != document.signupform.Password.value){

        document.signupform.PasswordConfirm.setCustomValidity("Password and Confirm Password fields don't match!")
    }
}

function checkDay(input){

    document.signupform.daybirth.setCustomValidity('');

    if(document.signupform.daybirth.value !=""){

        if (input.value < 1 || input.value >31){

            document.signupform.daybirth.setCustomValidity('Day Range should be between 1 and 31.');
        }
    }
}

function checkMonth(){

    document.signupform.monthbirth.setCustomValidity('');

    if(document.signupform.monthbirth.value !=""){

        if(document.signupform.monthbirth.value <1 ||  document.signupform.monthbirth.value >12){

            document.signupform.monthbirth.setCustomValidity('Month Range should be between 1 and 12.');

        }
    }
}

function checkYear(input){

    document.signupform.year.setCustomValidity('');

    if(document.signupform.year.value !=""){

        if (input.value < 1900 || input.value > (new Date()).getFullYear()){
            document.signupform.year.setCustomValidity('Year Range should be between 1900 and ' + (new Date()).getFullYear());
        }
    }
}