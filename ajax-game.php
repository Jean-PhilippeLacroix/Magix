<?php
    require_once("action/ajaxGameAction.php");

    $action = new ajaxGameAction();
    $data = $action->execute();

    echo json_encode($data["result"]);

    