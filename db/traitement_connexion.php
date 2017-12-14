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
        header('Location:../game.php');
    }
}

?>