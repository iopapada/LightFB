<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Welcome Page</title>
    <link rel="stylesheet" type="text/css" href="../../../../src/content/SiteIndex.css">
    <script src="../../../../src/scripts/Validations.js"></script>
</head>
<body>
<div id="header_bar">
    <div id="header_elements_container">
        <div class="fblight_logo">
            <h1>LightFB</h1>
        </div>
        <div class="login_container">
            <form id="login_form" method="post" action="/index.php">
                <table cellspacing="5">
                    <tbody>
                    <tr>
                        <td>
                            <label for="userlogin">Username or Email</label>
                        </td>
                        <td>
                            <label for="passlogin">Password</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input name="username"  type="text" id="userlogin" class="inputtext" required="true" aria-required="true">
                        </td>
                        <td>
                            <input name="pass" type="password" id="passlogin" class="inputtext" required="true" aria-required="true">
                        </td>
                        <td>
                            <button type="submit" class="btn btn-primary">Sign In</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label><a href="/index.php">Recover your password</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</div>
<div id="main_area">
    <div id="main_content">
        <div id="FBlight_slogan">
        </div>
        <div id="signup_area">
            <div id ="signup_text">
                Signup on LightFB!
            </div>
            <div id ="signup_form">
                <form method="post"  onsubmit="return checkForm(this);" action="/index.php">
                    <table cellspacing="5">
                        <tbody>
                            <tr>
                                <div id="firstname">
                                    <input name="FirstName" type="text" class="input-signup" placeholder="First Name" required="true" aria-required="true" minlength ="2">
                                </div>
                            </tr>
                            <tr>
                                <div id="lastname">
                                    <input name="LastName" type="text" class="input-signup" placeholder="Last Name" required="true" aria-required="true" minlength ="2">
                                </div>
                            </tr>
                            <tr>
                                <div id="emailInput">
                                    <input name="Email" type="email" class="input-signup" id="email" placeholder="Email" required="true" aria-required="true">
                                </div>
                            </tr>
                            <tr>
                                <div id="emailConfirmInput">
                                    <input name="ReEmail" type="email" class="input-signup" id="emailConfirm" placeholder="Confirm Email"   required="true" aria-required="true">
                                </div>
                            </tr>
                            <tr>
                                <div id="passwordSignup">
                                    <input name="Password" type="password" class="input-signup" placeholder="New Password" required="true" aria-required="true" min="5">
                                </div>
                            </tr>
                            <tr>
                                <div id="birthdayInput">
                                    <label>Birthday<input name="Birthday" type="text" pattern="\d{1,2}/\d{1,2}/\d{4}" placeholder="dd/mm/yyyy" class="input-signup" required="true" aria-required="true"></label>
                                </div>
                            </tr>
                            <tr>
                                <div id="gender">
                                    <label><input type="radio" name="gender" value="Male" class="radio-signup"required>Male</label>
                                    <label><input type="radio" name="gender" value="Female" class="radio-signup">Female</label>
                                </div>
                            </tr>
                            <tr>
                                <div id="submit_form">
                                    <button type="submit" id="submit_btn">Sign Up</button>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div id="signup_message">
                {PAGE_CONTENT}
            </div>
        </div>
    </div>
</div>
<div id="footer_bar">
    <div id="copyright">
        <p>LightFB © 2015</p>
    </div>
</div>
</body>
</html>