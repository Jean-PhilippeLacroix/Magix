<?php
    require_once("action/gameAction.php");

    $action = new gameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
        <script src="src/game.js"></script>
    </head>
    <body id="gameField">

        <div id="opponentStats" class="section">
        </div>

        <div id="advBoard" class="section">
        </div>

        <div id="myBoard" class="section">
        </div>

        <div id="myHand" class="section">
        </div>

        <div id="myStats" class="section">
        </div>

        <div id="gameDetails" class="section">
            <div id="turnTimer">
            </div>

            <div id="pass">Passer le Tour</div>

            <div id="hero">Hero Power</div>
        </div>

        <div id="quitGameButton">
            <form action="" method="POST">
                <button type=submit name="quitter">Quitter</button>
            </form>
        </div>

<?php
    require_once("partial/footer.php");