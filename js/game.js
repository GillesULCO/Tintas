"use strict";

/**
* Tintas
*/

// Dimensions du canvas
var WIDTH = 800;
var HEIGHT = 600;
// Slots Dimensions
var SLOT_WIDTH = 65;
var SLOT_HEIGHT = 57;
var HALF_SLOT_HEIGHT = SLOT_HEIGHT / 2;
// Nombre de colonnes du plateau
var NUM_COLS = 9;

// Coordonnées du plateau de gauche à droite
var COORDS = [
    new Coordinates("A", 4), new Coordinates("A", 3), new Coordinates("B", 5), new Coordinates("B", 4),
    new Coordinates("B", 3), new Coordinates("B", 2), new Coordinates("B", 1), new Coordinates("C", 7),
    new Coordinates("C", 6), new Coordinates("C", 5), new Coordinates("C", 4), new Coordinates("C", 3),
    new Coordinates("C", 2), new Coordinates("C", 1), new Coordinates("D", 8), new Coordinates("D", 7),
    new Coordinates("D", 6), new Coordinates("D", 5), new Coordinates("D", 4), new Coordinates("D", 3),
    new Coordinates("D", 2), new Coordinates("E", 8), new Coordinates("E", 7), new Coordinates("E", 6),
    new Coordinates("E", 5), new Coordinates("E", 4), new Coordinates("E", 3), new Coordinates("E", 2),
    new Coordinates("F", 8), new Coordinates("F", 7), new Coordinates("F", 6), new Coordinates("F", 5),
    new Coordinates("F", 4), new Coordinates("F", 3), new Coordinates("F", 2), new Coordinates("G", 9),
    new Coordinates("G", 8), new Coordinates("G", 7), new Coordinates("G", 6), new Coordinates("G", 5),
    new Coordinates("G", 4), new Coordinates("G", 3), new Coordinates("H", 9), new Coordinates("H", 8),
    new Coordinates("H", 7), new Coordinates("H", 6), new Coordinates("H", 5), new Coordinates("I", 7),
    new Coordinates("I", 6)
];


/** Au chargement de la page */
window.onload = function() {
    // Création du jeu de taille WIDTH * HEIGHT
    // Contexte du rendu automatique
    // Attaché à la div gameCanvas
    var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'gameCanvas', {preload: preload, create: create,
        update: update, render : render});

    // Le moteur du jeu
    var engine = new Engine();

    // La sélection courante
    var selection;

    // Une référence vers le sprite pion
    var spritePion;

    // Chargement des assets
    function preload() {
        game.load.image('slot', 'img/slot.png');
        game.load.image('slot_blue', 'img/slot_blue.png');
        game.load.image('slot_green', 'img/slot_green.png');
        game.load.image('slot_orange', 'img/slot_orange.png');
        game.load.image('slot_purple', 'img/slot_purple.png');
        game.load.image('slot_red', 'img/slot_red.png');
        game.load.image('slot_white', 'img/slot_white.png');
        game.load.image('slot_yellow', 'img/slot_yellow.png');
        game.load.image('slot_pion', 'img/slot_pion.png');
        game.load.image('sélection', 'img/selection.png');
        game.load.image('valider', 'img/bouton_valider.png');
    }

    // Initialisation
    function create() {
        game.stage.backgroundColor = '#2c3e50';

        // Nombres de slots, Offset en y
        var slotData = [[2, 0],
            [5, HALF_SLOT_HEIGHT],
            [7, HALF_SLOT_HEIGHT + SLOT_HEIGHT],
            [7, HALF_SLOT_HEIGHT],
            [7, -HALF_SLOT_HEIGHT],
            [7, -HALF_SLOT_HEIGHT],
            [7, HALF_SLOT_HEIGHT],
            [5, -HALF_SLOT_HEIGHT],
            [2, -SLOT_HEIGHT * 2.5]];

        // Ordonnée de départ
        var currentHeight = HEIGHT / 3;
        // Décalage pour centrer le plateau dans le canvas
        var xColOffset = 3;
        // L'indice de la coordonnée courante
        var coordIndex = 0;

        // Dessine le plateau de haut en bas
        for (var x = xColOffset; x < NUM_COLS + xColOffset; x++) {
            var slot = slotData[x - xColOffset];
            // Met à jour l'ordonnée de départ de la colonne courante
            currentHeight -= slot[1];

            // Placement des jetons de la colonne courante
            for (var i = 0; i < slot[0]; i++) {
                var currentCoordinates = COORDS[coordIndex++];
                var intersection = engine.getIntersection(currentCoordinates);

                // On cherche le sprite correspondant à la couleur de l'intersection
                var slotImage;
                if (intersection.getColor() === Tintas.Color.WHITE) {
                    slotImage = 'slot_white';
                } else if (intersection.getColor() === Tintas.Color.BLUE) {
                    slotImage = 'slot_blue';
                } else if (intersection.getColor() === Tintas.Color.GREEN) {
                    slotImage = 'slot_green';
                }  else if (intersection.getColor() === Tintas.Color.ORANGE) {
                    slotImage = 'slot_orange';
                }  else if (intersection.getColor() === Tintas.Color.PURPLE) {
                    slotImage = 'slot_purple';
                }  else if (intersection.getColor() === Tintas.Color.RED) {
                    slotImage = 'slot_red';
                }  else if (intersection.getColor() === Tintas.Color.YELLOW) {
                    slotImage = 'slot_yellow';
                } else {
                    slotImage = 'slot';
                }

                var slotSprite = game.add.sprite(x * SLOT_WIDTH / 1.26, currentHeight + (i * SLOT_HEIGHT), slotImage);
                // Données relatives au jeu
                slotSprite.coordinates = currentCoordinates;
                slotSprite.selected = false;
                // Activation des évènements
                slotSprite.inputEnabled = true;
                slotSprite.events.onInputDown.add(spriteClick, this);
            }
        }

        game.input.mouse.capture = true;
        selection = game.add.sprite(0, 0, 'sélection');
        hideSelection();

        game.add.button(game.world.width - 95, 550, 'valider', validerAction, this, 0, 0, 0);
    }

    function validerAction() {

    }

    function update() {

    }

    function changeSpriteTexture(sprite, textureName) {
        sprite.loadTexture(textureName, 0);
    }

    function hideSelection() {
        selection.visible = false;
    }

    function showSelection() {
        selection.visible = true;
    }

    function moveSelectionTo(x, y) {
        selection.x = x;
        selection.y = y;
    }

    function selectSprite(sprite) {
        moveSelectionTo(sprite.worldPosition.x, sprite.worldPosition.y);
        showSelection();
    }

    function spriteClick(sprite, pointer) {
        if (pointer.leftButton.isDown) {
            leftClick(sprite);
        }
    }

    function leftClick(sprite) {
        var state = engine.getCurrentState();

        if (engine.putPiece(sprite.coordinates)) {
            changeSpriteTexture(sprite, 'slot_pion');
        }

    }

    function render() {

    }
}