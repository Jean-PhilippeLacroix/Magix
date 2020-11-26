<?php
    require_once("action/CommonAction.php");

    class ajaxGameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            $result = "";

            if(!empty($_POST["action"])){
                $data["key"] = $_SESSION['gameKey'];
                $data["type"] = $_POST["action"];

                if($_POST["action"] == "PLAY"){
                    $data["uid"] = $_POST["uid"];
                }

                elseif($_POST["action"] == "ATTACK"){
                    $data["uid"] = $_POST["uid"];
                    $data["targetuid"] = $_POST["target"];
                }

                $result = CommonAction::callAPI("games/action", $data);
            }

            if(!empty($_POST["result"])){
                resultDAO::setGameResult($_POST["classe"], $_POST["adversaire"], $_POST["advClasse"], $_POST["result"]);
                $result = "database write";
            }
            
            return compact ("result");
        }
    }