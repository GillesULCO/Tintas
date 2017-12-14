<?php
    function getPDO(){
        $PARAM_hote = 'localhost';
        $PARAM_port = '3306';
        $PARAM_nom_bd = 'tintas';
        $PARAM_utilisateur = 'phpmyadmin';
        $PARAM_mot_passe = 'test';

        $pdo =  new PDO('mysql:host=' .
            $PARAM_hote .
            ';port=' .
            $PARAM_port .
            ';dbname=' .
            $PARAM_nom_bd,
            $PARAM_utilisateur,
            $PARAM_mot_passe,
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
        );

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }

    $pdo = getPDO();

?>