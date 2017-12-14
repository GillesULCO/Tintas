<?php
include_once 'db/connexion_bdd.php';
?>

<!doctype html>
<html lang="fr">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>TINTAS game !</title>

    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet"
          type="text/css">
    <link href="css/freelancer.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/tintas.css" rel="stylesheet">
    <script type="text/javascript" src="vendor/phaser/phaser.js"></script>
    <script type="text/javascript" src="js/game.js"></script>
    <script type="text/javascript" src="https://apis.google.com/js/plusone.js">
        {lang: 'fr'}
    </script>

</head>
<body>
<nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
    <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="index.php">DIETER STAIN</a>
        <button class="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item mx-0 mx-lg-1">
                    <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="inscription.php">Inscription</a>
                </li>
                <li class="nav-item mx-0 mx-lg-1">
                    <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="connexion.php">Connexion</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div class="text-white" style="padding-top: 0px; margin-top: 150px;">
        <div class="row" style="margin-bottom: 15px">
            <div class="col-md-3 text-center">
                Mode de jeu souhaité :
            </div>
            <div class="col-md-6 text-center">
                <button type="button" class="btn btn-primary" id="btn-1vs1" style="margin-right:5px">1 vs 1</button>
                <button type="button" class="btn btn-success" style="margin-right:5px">Matchs aller/retour</button>
                <button type="button" class="btn btn-warning">Le 4 à la suite</button>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="panel panel-default text-center" style="padding-top:100px">
                    <div class="panel-heading" style="font-weight: bold; font-size: 25px; margin-bottom: 30px">JOUEUR</div>
                    <div class="panel-body">
                        <div class="col-md-12" style="margin-bottom: 10px">
                            Pseudo : ALBERT
                        </div>
                        <div class="col-md-12">
                            Catégorie : ADULTE
                        </div>
                    </div>
                </div>
                <div class="panel panel-default text-center" style="padding-top:50px">
                    <div class="panel-heading" style="font-weight: bold; font-size: 25px; margin-bottom: 30px">STATISTIQUES</div>
                    <div class="panel-body">
                        <div class="col-md-12" style="margin-bottom: 10px">
                            Nombre de parties jouées : 10
                        </div>
                        <div class="col-md-12">
                            Victoires : 6
                        </div>
                        <div class="col-md-12">
                            Défaites : 4
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div id="gameCanvas"></div>
            </div>
            <div class="col-lg-3">
                <div class="panel panel-default text-center" style="padding-top:100px">
                    <div class="panel-heading" style="font-weight: bold; font-size: 20px; margin-bottom: 30px">Gagnez des points facilement !</div>
                    <div class="panel-body">
                        <div class="col-lg-12 text-center">
                            <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FTintas-Game-173850120023621%2F&width=163&layout=button_count&action=like&size=large&show_faces=true&share=true&height=46&appId"
                                    width="163" height="46" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                                    allowTransparency="true"></iframe>
                        </div>
                        <div class="col-lg-12 text-center">
                            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button"
                               data-show-count="false">Tweet</a>
                            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                        </div>
                        <div class="col-lg-12 text-center">
                            <g:plusone size="tall"></g:plusone>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group text-center" style="margin-bottom: 15px; margin-top: 15px">
            <button type="button" class="btn btn-danger" style="margin-right:5px">Quitter la partie</button>
        </div>
</div>

</body>

</html>
