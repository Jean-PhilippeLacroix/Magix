<?php
    require_once("action/disconnectAction.php");

    $action = new disconnectAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
    <?php
        if($data){
    ?>
        <div>
            <?= $data["message"] ?>
        </div>
    <?php
        }
    ?>
    <form action="" method="POST">
        <button type="submit" name="disconnect">Deconnexion</button>
    </form>

<?php
    require_once("partial/footer.php");