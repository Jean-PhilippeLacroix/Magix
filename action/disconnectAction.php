<?php
    require_once("action/CommonAction.php");

    class disconnectAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $message = NULL;
            $key = [];

            if(isset($_POST["disconnect"])){
                $key["key"] = $_SESSION['gameKey'];
                $result = CommonAction::callAPI("signout", $key);
                
                if($result == "SIGNED_OUT"){
                    $message = "deconnexion";
                }
                elseif($result == "INVALID_KEY"){
                    $message = "erreur";
                }
                else{
                    $message = "WTF";
                }
            }

            return compact("message");
        }
    }