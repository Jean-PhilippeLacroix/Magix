<?php
    require_once("action/gameAction.php");

    $action = new gameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
        <script src="src/game.js"></script>
        <script src="src/chat.js"></script> 
    </head>
    <body id="gameField">

        <div id="playArea">
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
        </div>

        <div id="gameDetails" class="actionSection">
            <div id="turnTimer" class="action">
            </div>

            <div id="yourTurn" class="action">
            </div>

            <div id="pass" class="action">Passer le Tour</div>

            <div id="hero" class="action">Hero Power</div>

            <div id="chatButton" class="action">Chat</div>

            <div id="quitGameButton">
                <form action="" method="POST">
                    <button type=submit name="quitter">Quitter</button>
                </form>
            </div>
        </div>

        <div id="gameChat">
            <iframe style="width:700px;height:240px;backgound" onload="applyStyles(this)"
                src="https://magix.apps-de-cours.com/server/#/chat/<?=$_SESSION["gameKey"]?>">
            </iframe>
        </div>

        

<?php
    require_once("partial/footer.php");