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
                $message = $result;
                
                if($result == "SIGNED_OUT"){
                    $_SESSION["visibility"] = 0;
                    header("location:index.php");
                    exit;
                }
            }
            elseif(isset($_POST["pratiquer"])){
                $data["key"] = $_SESSION['gameKey'];
                $data["type"] = "TRAINING";
                //$result = CommonAction::callAPI("games/auto-match", $data);

                $message = $result;
                header("location:game.php");
                exit;
            }

            elseif(isset($_POST["jouer"])){
                $data["key"] = $_SESSION['gameKey'];
                $data["type"] = "PVP";
                //$result = CommonAction::callAPI("games/auto-match", $data);

                $message = $result;
                header("location:game.php");
                exit;
            }

            return compact("message");
        }
    }