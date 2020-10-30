<?php
    require_once("action/lobbyAction.php");

    $action = new lobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
    <body id="lobby">

        <div>
            <form action="" method="POST">
                <button type="submit" name="disconnect">Quitter</button>
            </form>
        </div>

        <div>
            <form action="" method="POST">
                <button type="submit" name="pratiquer">Pratiquer</button>
            </form>
        </div>

        <div>
            <form action="" method="POST">
                <button type="submit" name="jouer">Jouer</button>
            </form>
        </div>

        <div>
            <iframe style="width:700px;height:240px;backgound" 
                src="https://magix.apps-de-cours.com/server/#/chat/<?=$_SESSION["gameKey"]?>">
            </iframe>
        </div>

        <?= $data["message"] ?>

<?php
    require_once("partial/footer.php");