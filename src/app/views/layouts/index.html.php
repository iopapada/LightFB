<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Welcome Page</title>
    <link rel="stylesheet" type="text/css" href="/src/content/SiteIndex.css">
</head>
<body>
{PAGE_CONTENT}
<div class="jumbotron">
    <table class="intro-index-table">
        <td width="50%">
            <h1>LikeFB</h1>
            <form method="post" action="/index.php">
                <div>
                    <input name="Username" type="text" class="input-group-addon" placeholder="Username or Email">
                </div>
                <div>
                    <input name="Password" type="password" class="input-group-addon" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Sign In</button>
            </form>
        </td>
        <td width="50%">
            <p class="lead"><br /></p>
            <form method="post" action="/index.php">
                <div>
                    <input name="FirstName" type="text" class="input-group-addon" placeholder="First Name">
                </div>
                <div>
                    <input name="LastName" type="text" class="input-group-addon" placeholder="Last Name">
                </div>
                <div>
                    <input name="EmailOrPhone" type="text" class="input-group-addon" placeholder="Email or mobile number">
                </div>
                <div>
                    <input name="Re-Email" type="text" class="input-group-addon" placeholder="Re-enter email or mobile number">
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
        </td>
    </table>
</div>
<div>
    <table class="intro-info-table">
        <td width="33%">
            <div class="col-md-4">
                <h2>See photos and updates</h2>
                <p>
                    <br/>
                </p>
                <p><a class="btn btn-default" href="#">Learn more &raquo;</a></p>
            </div>
        </td>
        <td width="33%">
            <div class="col-md-4">
                <h2>Share what's new</h2>
                <p><br/></p>
                <p><a class="btn btn-default" href="#">Learn more &raquo;</a></p>
            </div>
        </td>
        <td width="33%">
            <div class="col-md-4">
                <h2>Find more</h2>
                <p><br/></p>
                <p><a class="btn btn-default" href="#">Learn more &raquo;</a></p>
            </div>
        </td>
    </table>
</div>

<footer class="footer-main">
    <div class="footer-short">
        <p>© 2015 LikeFB s.r.o. All rights reserved</p>
    </div>
</footer>
</body>
</html>