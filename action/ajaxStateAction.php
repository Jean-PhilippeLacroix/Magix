<?php
    require_once("action/CommonAction.php");

    class ajaxStateAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $json = "";
            $result = "";
            $data["key"] = $_SESSION['gameKey'];

            $result = CommonAction::callAPI("games/state", $data);
  
            return compact ("result");
        }
    }