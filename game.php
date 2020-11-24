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

        <div id="gameActions" class="section">

            <div id="play" class="action">jouer Carte</div>

            <div id="attack" class="action">Attaquer</div>

            <div id="pass" class="action">Passer le Tour</div>

            <div id="hero" class="action">Hero Power</div>
        </div>

        <div id="gameDetails" class="actionSection">
            <div id="turnTimer" class="action">
            </div>

            <div id="yourTurn" class="action">
            </div>

            <div id="quitGameButton">
                <form action="" method="POST">
                    <button type=submit name="quitter">Quitter</button>
                </form>
            </div>
        </div>

        

<?php
    require_once("partial/footer.php");