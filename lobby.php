<?php
    require_once("action/lobbyAction.php");

    $action = new lobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
       <script src="src/chat.js"></script> 
    </head>
    <body id="lobby">

        <div id="welcomeMessage">
            Welcome to your new life underground, <?= $_SESSION["myName"] ?>!
        </div>

        <div id="boutonsDeLobby">
            <div>
                <form action="" method="POST">
                    <button type="submit" name="disconnect" class="lobbyButton">Quitter</button>
                </form>
            </div>

            <div>
                <form action="" method="POST">
                    <button type="submit" name="pratiquer" class="lobbyButton">Pratiquer</button>
                </form>
            </div>

            <div>
                <form action="" method="POST">
                    <button type="submit" name="jouer" class="lobbyButton">Jouer</button>
                </form>
            </div>
        </div>

        <div>
            <iframe style="width:700px;height:240px;backgound" onload="applyStyles(this)"
                src="https://magix.apps-de-cours.com/server/#/chat/<?=$_SESSION["gameKey"]?>">
            </iframe>
        </div>

<?php
    require_once("partial/footer.php");