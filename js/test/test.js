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
        nbColors[inter.getColor()]++;
    }
    var indexColor;
    for (indexColor = 0; indexColor < 7 ; indexColor++){
        assertTrue(nbColors[indexColor] === 3);
    }
};

