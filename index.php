<?php
    require_once("action/indexAction.php");

    $action = new indexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>  
    </head>
    <body id="login">
        <form action="" method="POST">
            <div>
                <input type="text" name="Username" class = "field" placeholder = "Username">
            </div>

            <div>
                <input type="password" name="Password" class = "field" placeholder = "Password">
            </div>

            <input type="submit" name="connexion" value="Connexion" class = "field">      
        </form>

<?php
    require_once("partial/footer.php");