<?php
/*
	ON KILL LE COOKIE POUR DECONNECTER L'UTILISATEUR
*/
setcookie("cookieTintas",'',time()-1, '/');
header('Location:../en_index.php');