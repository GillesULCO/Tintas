<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inscription</title>

    <!-- CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">

    <!-- SCRIPTS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>

</head>
<body>
<div class="container-fluid">
    <div class="col-lg-6 offset-lg-3">
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 id="title_inscription" class="display-3">Inscription</h1>
                <form action="db/traitement_inscription.php" method="post">
                    <div class="form-group">
                        <label for="name">Nom<red>*</red></label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="firstName">Prénom<red>*</red></label>
                        <input type="text" class="form-control" name="firstName" required>
                    </div>
                    <div class="form-group">
                        <label for="age">Age<red>*</red></label>
                        <select class="form-control" name="age">
                            <?php
                                for($i = 1; $i < 111; $i++){
                                    echo '<option value="' . $i . '">' . $i . '</option>';
                                }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pseudo">Pseudo<red>*</red></label>
                        <input type="text" class="form-control" name="pseudo" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Adresse mail<red>*</red></label>
                        <input type="email" class="form-control" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Mot de passe<red>*</red></label>
                        <input type="password" class="form-control" name="password" required>
                    </div>
                    <div class="form-group">
                        <label for="repeatPassword">Confirmer le mot de passe<red>*</red></label>
                        <input type="password" class="form-control" name="repeatPassword" required>
                    </div>
                    <div class="text-center">
                        <button type="submit" id="centerButton" class="btn btn-primary">S'inscrire</button>
                    </div>
                </form>
            </div>
        </div>
        <a href="index.php"><button type="button" id="centerButton" class="btn btn-primary">Revenir à la page d'accueil</button></a>
    </div>
</div>
</body>
</html>

