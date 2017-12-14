<?php
    include_once 'connexion_bdd.php';

    $queryDeleteUser = $pdo -> prepare("DELETE FROM `users` WHERE ID_USR = :id");
    $queryDeleteUser -> execute(array('id' => $_GET['iduser']));

    header('Location:../accueil_admin.php');

?>

