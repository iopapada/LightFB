function checkForm(form) {

    if (form.Email.value != '' && form.ReEmail.value != '') {

        /*check correct e-mail RegExp for old browser compatibility*/

        if (form.Email.value != form.ReEmail.value) {

            alert("Email and Email Confirmation don't match!");

            return false;
        }

    }

    // regular expression to match required date format
    var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    var regs = "";

    if (form.Birthday.value != '') {
        if (regs = form.Birthday.value.match(re)) {

            var parts = form.Birthday.value.split("/");
            var day = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10);
            var year = parseInt(parts[2], 10);

            /*form.Birthday.setCustomValidity('');*/

            // day value between 1 and 31
            if (day < 1 || day > 31) {
                alert("Invalid value for day: " + day);

                /*Seems setCustomValidity is not triggering the submit event after first time*/

                /*form.Birthday.setCustomValidity("Invalid value for day: " + day);*/
                return false;
            }

            // month value between 1 and 12
            if (month < 1 || month > 12) {
                alert("Invalid value for month: " + month);
                /*form.Birthday.setCustomValidity("Invalid value for month: " + month);*/
                return false;
            }

            // year value between 1900 and 2015
            if (year < 1900 || year > (new Date()).getFullYear()) {
                alert("Invalid value for year: " + year + " - must be between 1900 and " + (new Date()).getFullYear());
                /*form.Birthday.setCustomValidity("Invalid value for year: " + year + " - must be between 1900 and " + (new Date()).getFullYear());*/

                return false;
            }
        } else {
            alert("Invalid Date: " + form.Birthday.value);
            /*form.Birthday.setCustomValidity("Invalid Date: " + form.Birthday.value);*/
            return false;
        }
    }
    return true;
}