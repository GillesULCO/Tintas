<?php

    include_once 'connexion_bdd.php';

    if($_POST['age'] > 15){
        $categorie = 1;
    }else{
        $categorie = 2;
    }

    if($_POST['password'] == $_POST['repeatPassword']){
        $queryInsertUser = $pdo -> prepare("INSERT INTO users(PSEUDO_USR,NAME_USR,FIRSTNAME_USR,AGE_USR,MAIL_USR,PASS_USR,CAT_USR) VALUES (:pseudo,:name,:firstName,:age,:mail,:password,:cat)");
        $queryInsertUser -> execute(array('pseudo' => $_POST['pseudo'],
            'name'  => $_POST['name'],
            'firstName' => $_POST['firstName'],
            'age' => $_POST['age'],
            'mail' => $_POST['email'],
            'password' => hash('sha512',$_POST['password']),
            'cat' => $categorie));

        header('Location:./game.php');
    }
?>