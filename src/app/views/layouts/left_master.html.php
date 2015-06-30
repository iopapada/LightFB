<div id="leftbar">
    <ul>
        <li>
            <a href="index.php?action=myprofile">My Profile</a>
        </li>
        <li>
            <a href="index.php?action=editprofile&name=<?php echo $_SESSION['user_id']?>"  >Edit My Profile</a>
        </li>
    </ul>

    <div id="phototab">
        <h4>My Photos</h4>
        <table id="myphoto">
            <tbody>
            <?php
                $userid = $_SESSION['user_id'];
                $results= db_query_select("SELECT img,imgname FROM images
                                           INNER JOIN albums ON albums.id = images.albumid
                                           INNER JOIN userprofile ON userprofile.email = '$userid'");

                for($x = 0; $x<count($results); $x++){
                    $results[$x]['img'] = base64_encode($results[$x]['img']);
                }
                for($i=0;$i<3;$i++) {
                    echo "<tr>";
                    for($j=0;$j<3;$j++) {
                        echo "<td>";
                        if($j+($i*3) < count($results))echo "<img src=data:image/jpeg;base64," . $results[$j+($i*3)]['img'] . "></img>";
                        echo "<td>";
                    }
                    echo "</tr>";
                }
            ?>
            </tbody>
        </table>
    </div>


    <div id="phototab">
        <h4>My Friends</h4>
        <table id="myphoto">
            <tbody>
            <?php
            $userid = $_SESSION['user_id'];
            $results= db_query_select("SELECT DISTINCT firstname,lastname,pictureURL FROM userprofile
                                    INNER JOIN friends ON userprofile.email = friends.userid OR userprofile.email = friends.friendid
                                    WHERE (friends.userid = '$userid' OR friends.friendid = '$userid' ) AND friends.approved ='1'  AND email != '$userid'");

            for($x = 0; $x<count($results); $x++){
                $results[$x]['pictureURL'] = base64_encode($results[$x]['pictureURL']);
            }
            for($i=0;$i<3;$i++) {
                echo "<tr>";
                for($j=0;$j<3;$j++) {
                    echo "<td>";
                    if($j+($i*3) < count($results))echo "<img src=data:image/jpeg;base64," . $results[$j+($i*3)]['pictureURL'] . "></img>";
                    echo "<td>";
                }
                echo "</tr>";
            }
            ?>
            </tbody>
        </table>
    </div>
</div>