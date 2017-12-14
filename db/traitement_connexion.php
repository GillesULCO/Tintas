<?php

include_once 'connexion_bdd.php';

if(isset($_POST['pseudo']) && !empty($_POST['pseudo']) && isset($_POST['motdepasse']) && !empty($_POST['motdepasse']))
{
    $query="SELECT * FROM users WHERE pseudo_usr = :pseudo AND pass_usr = :motdepasse";

    $prep = $pdo->prepare($query);
    $prep->bindValue(':pseudo', $_POST['pseudo']);
    $prep->bindValue(':motdepasse', hash('sha512', $_POST['motdepasse']));
    $prep->execute();

    if($count = $prep->rowCount() > 0)
    {
        $data=$prep->fetch();

        $id=$data['ID_USR'];

        /*
            CREATION D'UN COOKIE CONTENANT POUR VALEUR UN SID COMPOSE DES ACCES DE LA PERSONNE CONCATENES AVEC LA FONCTION TIME() DE PHP
            ENREGISTREMENT EN BDD DU SID
        */
        $sid = md5($_POST['pseudo'].$_POST['motdepasse'].time());

        setcookie("cookieTintas", $sid, time()+3600, '/');

        $query = 'UPDATE users SET SESSION_USR = :sid WHERE ID_USR =:id ';
        $prep = $pdo->prepare($query);
        $prep->bindValue(':sid', $sid);
        $prep->bindValue(':id', $id);
        $prep->execute();

        if($data['CAT_USR'] == 3){
            header('Location:../accueil_admin.php');
        }else{
            header('Location:../game.php');
        }
    } else {
        header('Location:../connexion.php');
    }
}
?>