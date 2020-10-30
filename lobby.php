<?php
    require_once("action/lobbyAction.php");

    $action = new lobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
    <body id="lobby">

        <?= $data["message"] ?>

        <form action="" method="POST">
            <button type="submit" name="disconnect">Quitter</button>
        </form>

<?php
    require_once("partial/footer.php");