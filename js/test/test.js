'use strict';

var TintasTestCase = TestCase(" TintasTestCase");

/**
 * Une coordonnée est située sur une ligne et une colonne valide
 */

TintasTestCase.prototype.testStory1 = function(){
    var A3 = new Coordinates('A', 3);
    var A2 = new Coordinates('A', 2);

    assertTrue(A3.equal(A3));
    assertTrue(A3.isValid());
    assertFalse(A2.isValid());
};

