<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Projet M1 I2L - Jeu TINTAS</title>

    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <link href="css/freelancer.min.css" rel="stylesheet">
    <link href="css/tintas.css" rel="stylesheet">

</head>

<body id="page-top">

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

<header class="masthead bg-primary text-white text-center">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel panel-heading text-center">
                        <h3 class="panel-title">
                            AUTHENTIFICATION
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <img src="img/cadenas.jpg" alt="cadenas" class="img-rounded" >
                            </div>
                        </div>
                        <form class="form-horizontal" method="POST" action="connexion_tintas.php">
                            <div class="form-group" style="margin-top:70px">
                                <label class="col-md-4 control-label" for="email" >Identifiant :</label>
                                <div class="col-md-12" id="pseudoDIV">
                                    <input type="text" class="form-control" id="pseudo" name="pseudo" placeholder="Email">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="motdepasse">Mot de passe :</label>
                                <div class="col-md-12" id="motdepasseDIV">
                                    <input type="password" class="form-control" id="motdepasse" name="motdepasse" placeholder="Mot de passe">
                                </div>
                            </div>
                            <div class="col-md-8 col-md-offset-2 hidden text-center msgErreur"></div>
                            <div class="col-md-8 col-md-offset-2 text-center" id="errorLog">Votre identifiant ou mot de passe est incorrect !</div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-primary btn-block" id="btn-connexion">Se connecter</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="panel-footer text-right">
                        Mot de passe perdu ? <a href="#"> Cliquez ici</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>


<div class="scroll-to-top d-lg-none position-fixed ">
    <a class="js-scroll-trigger d-block text-center text-white rounded" href="#page-top">
        <i class="fa fa-chevron-up"></i>
    </a>
</div>

<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="js/freelancer.min.js"></script>

</body>

</html>
