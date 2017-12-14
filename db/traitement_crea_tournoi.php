<?php

    include_once 'connexion_bdd.php';

    $queryEnregistrementTournoi = $pdo -> prepare("INSERT INTO tournois(TITRE_TOURN,DATEDEB_TOURN,DATEFIN_TOURN,CAT_TOURN) VALUES(:titre,:debut,:fin,:categorie)");
    $queryEnregistrementTournoi -> execute(array('titre'     => $_POST['titre'],
                                                 'debut'     => $_POST['debut'],
                                                 'fin'       => $_POST['fin'],
                                                 'categorie' => $_POST['categorie']));

    header('Location:../accueil_admin.php');
?>


