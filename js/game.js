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


/** Au chargement de la page */
window.onload = function() {
    // Création du jeu de taille WIDTH * HEIGHT
    // Contexte du rendu automatique
    // Attaché à la div gameCanvas
    var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'gameCanvas', {preload: preload, create: create,
        update: update, render : render});

    // Chargement des assets
    function preload() {
        game.load.image('slot', 'img/slot.png');
    }

    // Initialisation
    function create() {
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

        var currentHeight = HEIGHT / 3;
        var xColOffset = 3;
        var tmp = 0;

        // Dessine de haut en bas
        for (var x = xColOffset; x < NUM_COLS + xColOffset; x++) {
            var slot = slotData[x - xColOffset];
            currentHeight -= slot[1];

            for (var i = 0; i < slot[0]; i++) {
                var slotSprite = game.add.sprite(x * SLOT_WIDTH / 1.26, currentHeight + (i * SLOT_HEIGHT), 'slot');
                slotSprite.tmp = tmp++;
                slotSprite.inputEnabled = true;
                slotSprite.events.onInputDown.add(spriteClick, this);
            }
        }

        game.input.mouse.capture = true;
    }

    function update() {

    }

    function spriteClick(sprite, pointer) {
        if (pointer.leftButton.isDown) {
            console.log(sprite.tmp);
        } else if (pointer.rightButton.isDown) {
            console.log("RIGHT");
        }
    }

    function render() {

    }
}

