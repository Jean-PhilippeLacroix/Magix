<?php
    require_once("action/constants.php");

    class Connection{
        private static $connection = null;
        public static function getConnection(){
            if(Connection::$connection == null){
                Connection::$connection = new PDO("pgsql:host=" . DB_HOST . ";dbname=" . DB_NAME. ";user=" . DB_USER . ";password=" . DB_PASS);
                Connection::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                Connection::$connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            }
            return Connection::$connection;
        }
    }