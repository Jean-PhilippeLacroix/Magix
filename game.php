<?php
    require_once("action/gameAction.php");

    $action = new gameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
        <script src="src/game.js"></script>
    </head>
    <body id="gameField">

        <form action="" method="POST">
            <button type=submit name="quitter">Quitter</button>
        </form>

        


<?php
    require_once("partial/footer.php");