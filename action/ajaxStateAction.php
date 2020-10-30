<?php
    require_once("action/CommonAction.php");

    class ajaxStateAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_);
        }

        protected function executeAction() {
            $json = "";
            $result = "";
            $data["key"] = $_SESSION['gameKey'];

            $json = CommonAction::callAPI("game/state", $data);

            if($json == "WAITING" || $json == "LAST_GAME_WON" || $json == "LAST_GAME_LOST"){
                $result = $json;
            }
            else{
                $result = json_decode($json);
            }
            
            
            return compact ("result");
        }
    }