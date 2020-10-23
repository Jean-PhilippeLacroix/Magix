<?php
    require_once("action/indexAction.php");

    $action = new indexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

    <?= $data["message"] ?>

    <form action="" method="POST">
        <label for="Username">Nom d'Utilisateur: </label>
        <input type="text" name="Username">

        <label for="Password">Mot de Passe: </label>
        <input type="text" name="Password">

        <input type="submit" name="connexion" value="Connexion">      
    </form>

    <a href="disconnect.php">Deconnexion</a>

<?php
    require_once("partial/footer.php");