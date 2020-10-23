<?php
    require_once("action/CommonAction.php");

    class indexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = NULL;
            $data = [];
            $message = "Rien a signaler";

            if(isset($_POST["connexion"])){
                if(isset($_POST["Username"])){
                    if(isset($_POST["Password"])){
                        $data["username"] = $_POST["Username"];
                        $data["password"] = $_POST["Password"];

                        $result = CommonAction::callAPI("signin", $data);
                        if ($result == "INVALID_USERNAME_PASSWORD"){
                            $message = "infos invalides";
                        }
                        else{
                            CommonAction::keyAdd($result->key);
                            $message = $result->key;
                        }
                    }else{
                        $message = "pas de mot de Passe";
                    }
                }else{
                    $message = "pas de nom d'utilisateur";
                }
            }
                
            return compact("message");
        }
    }