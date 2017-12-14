'use strict';

var TintasTestCase = TestCase(" TintasTestCase");

/**
 * Une coordonnée est située sur une ligne et une colonne valide
 */

TintasTestCase.prototype.testStory1 = function () {
    var A3 = new Coordinates('A', 3);
    var A2 = new Coordinates('A', 2);

    assertTrue(A3.equal(A3));
    assertTrue(A3.isValid());
    assertFalse(A2.isValid());
};

/**
 * Test State et Color d'une intersection
 */

TintasTestCase.prototype.testStory2 = function () {
    var A3 = new Coordinates('A', 3);
    var inter_A3 = new Intersection(A3);

    assertTrue(inter_A3.getState() === Tintas.State.VACANT);
    assertTrue(inter_A3.getColor() === Tintas.Color.TRANSPARENT);

    inter_A3.setColor(Tintas.Color.GREEN);
    assertTrue(inter_A3.getColor() === Tintas.Color.GREEN);
    assertTrue(inter_A3.getState() === Tintas.State.FULL);

    inter_A3 = new Intersection(A3, Tintas.Color.WHITE);
    assertTrue(inter_A3.getState() === Tintas.State.FULL);
    assertTrue(inter_A3.getColor() === Tintas.Color.WHITE);
};

/**
 * Test initialisation plateau : toutes les intersections initialisées + 7 couleurs par couleur
 */

TintasTestCase.prototype.testStory3 = function() {
    var engine = new Engine();
    assertTrue(engine.getIntersections().length === 49);

    var indexInter, inter;
    var nbColors = [0, 0, 0, 0, 0, 0, 0];
    for (indexInter = 0; indexInter < engine.getIntersections().length; indexInter += 1) {
        inter = engine.getIntersections()[indexInter];
        assertTrue(inter.getColor() !== undefined);
        nbColors[inter.getColor()]++;
    }
    var indexColor;
    for (indexColor = 0; indexColor < 7 ; indexColor++){
        assertTrue(nbColors[indexColor] === 7);
    }
};

/**
 * Test Voisins d'une coordonnées
 */

TintasTestCase.prototype.testStory4 = function(){
    var engine = new Engine();
    var A3 = new Coordinates('A', 3);
    var A4 = new Coordinates('A', 4);
    var B4 = new Coordinates('B', 4);
    var B3 = new Coordinates('B', 3);
    var voisins = engine.getVoisins(A3);
    assertTrue(voisins[0].equal(A4));
    assertTrue(voisins[1].equal(B4));
    assertTrue(voisins[2].equal(B3));
};

/**
 * Test Mouvements
 */

TintasTestCase.prototype.testStory4 = function(){
    var engine = new Engine();
    var A3 = new Coordinates('A', 3);
    var A4 = new Coordinates('A', 4);
    var B4 = new Coordinates('B', 4);
    var B3 = new Coordinates('B', 3);
    var C5 = new Coordinates('C', 5);
    engine.putPiece(B4);
    engine.move(A3);
    var voisins = engine.getVoisins(A3);
    assertTrue(voisins[0].equal(A4));
    assertTrue(voisins[1].equal(C5));
    assertTrue(voisins[2].equal(B3));
};

TintasTestCase.prototype.testStory5 = function(){
    var engine = new Engine();
    var currentPlayer = engine.getCurrentPlayer();
    var A3 = new Coordinates('A', 3);
    var inter_A3 = engine.getIntersection(A3);
    var B4 = new Coordinates('B', 4);
    var inter_B4 = engine.getIntersection(B4);
    engine.putPiece(A3);
    assertTrue(inter_A3.getColor() === Tintas.Color.BLACK);

    assertTrue(engine.isMoveValid(B4));
    assertTrue(engine.move(B4));
    assertTrue(currentPlayer == !engine.getCurrentPlayer());
    assertTrue(inter_A3.getState() === Tintas.State.VACANT);
    assertFalse(engine.move(A3));
    assertTrue(inter_B4.getState() === Tintas.State.FULL);
    assertTrue(inter_B4.getColor() === Tintas.Color.BLACK);

    assertFalse(engine.move(B4));
};

/**
 * Test player earns pieces
 */
TintasTestCase.prototype.testStory6 = function(){
    var engine = new Engine();
    var A3 = new Coordinates('A', 3);
    var inter_A3 = engine.getIntersection(A3);
    var A3color = inter_A3.getColor();
    engine.putPiece(A3);
    assertTrue(engine.getPiecesPlayer(engine.getCurrentPlayer())[A3color] === 1);
};


