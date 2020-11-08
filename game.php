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

        <div id="advBoard">
        </div>

        <div id="myBoard">
        </div>

        <div id="myHand">
        </div>


<?php
    require_once("partial/footer.php");