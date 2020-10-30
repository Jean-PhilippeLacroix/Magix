<?php
    require_once("action/ajaxStateAction.php");

    $action = new ajaxStateAction();
    $data = $action->execute();

    echo json_encode($data["result"]);

    