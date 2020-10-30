<?php
    require_once("action/CommonAction.php");

    class lobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $message = "rien a signaler";
            $key = [];

            if(isset($_POST["disconnect"])){
                $key["key"] = $_SESSION['gameKey'];
                $result = CommonAction::callAPI("signout", $key);
                
                if($result == "SIGNED_OUT"){
                    $_SESSION["visibility"] = 0;
                    header("location:index.php");
                    exit;
                }
                elseif($result == "INVALID_KEY"){
                    $message = "erreur";
                }
                else{
                    $message = "Autre probleme";
                }
            }

            return compact("message");
        }
    }