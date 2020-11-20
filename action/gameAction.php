<?php
    require_once("action/CommonAction.php");

    class gameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $message = "rien a signaler";

            if(isset($_POST["quitter"])){
                $message = "quitter";
                header("location:lobby.php");
                exit;
            }

            
            elseif(isset($_POST["gameState"])){
                $message = $_POST["gameState"];
            }
            
            return compact("message");
        }
    }