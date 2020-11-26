<?php

    require_once("action/DAO/Connection.php");

        class resultDAO {

            public static function setGameResult($classe, $adversaire, $advClasse, $result) {
                $connection = Connection::getConnection();
                
                $request = 'INSERT INTO resultat(ma_classe, adversaire, adv_classe, resultat) VALUES(:classe, :adversaire, :advClasse, :resultat)';
                $statement = $connection->prepare();

                $request->bindValue(':classe', $classe);
                $request->bindValue(':adversaire', $adversaire);
                $request->bindValue(':advClasse', $advClasse);
                $request->bindValue(':resultat', $result);

                $statement->execute();
            }

        }