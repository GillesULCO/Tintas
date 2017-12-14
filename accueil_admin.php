<?php

    include_once 'db/connexion_bdd.php';

    /*
    VERIFICATION DE LA PRESENCE DU COOKIE, RECUPERATION DES DONNEES LIES A CET UTILISATEUR
    */
    if (isset($_COOKIE['cookieTintas'])) {
        //Recuperation des categories
        $queryRecupCategories = $pdo -> prepare("SELECT ID_CAT,LABEL_CAT FROM categories");
        $queryRecupCategories -> execute(array());

        //Recuperation des tournois
        $queryRecupTournois = $pdo -> prepare("SELECT TITRE_TOURN,DATE_FORMAT(DATEDEB_TOURN,'%d-%m-%Y') AS DATEDEB_TOURN,DATE_FORMAT(DATEFIN_TOURN,'%d-%m-%Y') AS DATEFIN_TOURN,CAT_TOURN FROM tournois");
        $queryRecupTournois -> execute(array());

        //Recuperation des enfants
        $queryRecupEnfants = $pdo -> prepare("SELECT ID_USR,PSEUDO_USR,NAME_USR,FIRSTNAME_USR,AGE_USR,MAIL_USR FROM users WHERE CAT_USR = 2");
        $queryRecupEnfants -> execute(array());

        //Recuperation des adultes
        $queryRecupAdultes = $pdo -> prepare("SELECT ID_USR,PSEUDO_USR,NAME_USR,FIRSTNAME_USR,AGE_USR,MAIL_USR FROM users WHERE CAT_USR = 1");
        $queryRecupAdultes -> execute(array());
    } else {
        header('Location: index.php');
    }

    $date = date("d-m-Y");
?>
<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Section administrateur</title>

    <!-- CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">


    <!-- SCRIPTS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>

    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <link href="css/freelancer.min.css" rel="stylesheet">
    <link href="css/tintas.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
    <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="index.php">Partie administration</a>
        <button class="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item mx-0 mx-lg-1">
                    <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#rowTournoi">Tournois</a>
                </li>
                <li class="nav-item mx-0 mx-lg-1">
                    <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#rowUsers">Utilisateurs</a>
                </li>
                <li class="nav-item mx-0 mx-lg-1">
                    <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="db/traitement_deconnexion.php">Déconnexion</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div class="container text-center" id="margintopcontainer">
    <div class="row" id="rowTournoi">
        <h1>Créer un tournoi</h1>
    </div>
    <div class="row">
        <div class="col-lg-6 offset-lg-3">
            <form action="db/traitement_crea_tournoi.php" method="post">
                <div class="form-group">
                    <label for="titre">Titre<red>*</red></label>
                    <input type="text" class="form-control" name="titre" required>
                </div>
                <div class="form-group">
                    <label for="categorie">Catégorie<red>*</red></label>
                    <select class="form-control" name="categorie">
                        <?php
                        while($row = $queryRecupCategories -> fetch(PDO::FETCH_ASSOC)){
                            if($row['ID_CAT'] == 1 || $row['ID_CAT'] == 2){
                                echo '<option value="' . $row['ID_CAT'] . '">' . $row['LABEL_CAT'] . '</option>';
                            }
                        }
                        ?>
                    </select>
                </div>
                <div class="form-group">
                    <label for="debut">Début<red>*</red></label>
                    <input type="date" class="form-control" name="debut" required>
                </div>
                <div class="form-group">
                    <label for="debut">Fin<red>*</red></label>
                    <input type="date" class="form-control" name="fin" required>
                </div>
                <button type="submit" id="centerBut" class="btn btn-primary">Enregistrer un tournoi</button>
            </form>
        </div>
    </div>
    <div class="row">
        <h1>Tournois existants</h1>
    </div>
    <div class="row">
        <div class="col-md-3 text-center">
            <div class="bold">Légende</div>
        </div>
        <div class="col-md-3 text-center">
            <div class="green">A venir</div>
        </div>
        <div class="col-md-3 text-center">
            <div class="orange">En cours</div>
        </div>
        <div class="col-md-3 text-center">
            <div class="red">Terminé</div>
        </div>
    </div>
    <br>
    <div class="row">
        <table class="table">
            <thead class="thead-inverse">
            <tr>
                <th>Titre</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Catégorie</th>
            </tr>
            </thead>
            <tbody>
                <?php
                while($row = $queryRecupTournois -> fetch(PDO::FETCH_ASSOC)){
                    if($row['CAT_TOURN'] == 1){
                        if($date > $row['DATEDEB_TOURN'] && $date < $row['DATEFIN_TOURN']){
                            echo '<tr class="orange"><td>' . $row['TITRE_TOURN'] . '</td><td>' . $row['DATEDEB_TOURN'] . '</td><td>' . $row['DATEFIN_TOURN'] . '</td><td>Adultes</td></tr>';
                        }elseif($date < $row['DATEDEB_TOURN']){
                            echo '<tr class="green"><td>' . $row['TITRE_TOURN'] . '</td><td>' . $row['DATEDEB_TOURN'] . '</td><td>' . $row['DATEFIN_TOURN'] . '</td><td>Adultes</td></tr>';
                        }elseif($date > $row['DATEFIN_TOURN']){
                            echo '<tr class="red"><td>' . $row['TITRE_TOURN'] . '</td><td>' . $row['DATEDEB_TOURN'] . '</td><td>' . $row['DATEFIN_TOURN'] . '</td><td>Adultes</td></tr>';
                        }
                    }elseif($row['CAT_TOURN'] == 2){
                        if($date > $row['DATEDEB_TOURN'] && $date < $row['DATEFIN_TOURN']){
                            echo '<tr class="orange"><td>' . $row['TITRE_TOURN'] . '</td><td>' . $row['DATEDEB_TOURN'] . '</td><td>' . $row['DATEFIN_TOURN'] . '</td><td>Enfants</td></tr>';
                        }elseif($date < $row['DATEDEB_TOURN']){
                            echo '<tr class="green"><td>' . $row['TITRE_TOURN'] . '</td><td>' . $row['DATEDEB_TOURN'] . '</td><td>' . $row['DATEFIN_TOURN'] . '</td><td>Enfants</td></tr>';
                        }elseif($date > $row['DATEFIN_TOURN']){
                            echo '<tr class="red"><td>' . $row['TITRE_TOURN'] . '</td><td>' . $row['DATEDEB_TOURN'] . '</td><td>' . $row['DATEFIN_TOURN'] . '</td><td>Enfants</td></tr>';
                        }
                    }
                }
                ?>
            </tbody>
        </table>
    </div>
    <div class="row" id="rowUsers">
        <h1>Utilisateurs inscrits</h1>
    </div>
    <div class="row" id="rowCatUsers">
        <h2>Catégorie enfants</h2>
    </div>
    <div class="row">
        <table class="table">
            <thead class="thead-inverse">
            <tr>
                <th>Pseudo</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Age</th>
                <th>Adresse mail</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <?php
            while($row = $queryRecupEnfants -> fetch(PDO::FETCH_ASSOC)){
                echo '<tr><td>' . $row['PSEUDO_USR'] . '</td><td>' . $row['NAME_USR'] . '</td><td>' . $row['FIRSTNAME_USR'] . '</td><td>' . $row['AGE_USR'] . 'ans</td><td>' . $row['MAIL_USR'] . '</td><td><a href="db/traitement_suppresion_user.php?iduser=' . $row['ID_USR'] . '"><img src="img/delete.png"></a></td></tr>';
            }
            ?>
            </tbody>
        </table>
    </div>
    <div class="row" id="rowCatUsers">
        <h2>Catégorie adultes</h2>
    </div>
    <div class="row">
        <table class="table">
            <thead class="thead-inverse">
            <tr>
                <th>Pseudo</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Age</th>
                <th>Adresse mail</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <?php
            while($row = $queryRecupAdultes -> fetch(PDO::FETCH_ASSOC)){
                echo '<tr><td>' . $row['PSEUDO_USR'] . '</td><td>' . $row['NAME_USR'] . '</td><td>' . $row['FIRSTNAME_USR'] . '</td><td>' . $row['AGE_USR'] . 'ans</td><td>' . $row['MAIL_USR'] . '</td><td><a href="db/traitement_suppresion_user.php?iduser=' . $row['ID_USR'] . '"><img src="img/delete.png"></a></td></tr>';
            }
            ?>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>
