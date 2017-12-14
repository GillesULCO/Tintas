"use strict";

var Coordinates = function (c, l) {
    var validCoordinates = [
        "B1", "C1",
        "B2", "C2", "D2", "E2", "F2",
        "A3", "B3", "C3", "D3", "E3", "F3", "G3",
        "A4", "B4", "C4", "D4", "E4", "F4", "G4",
        "B5", "C5", "D5", "E5", "F5", "G5", "H5",
        "C6", "D6", "E6", "F6", "G6", "H6", "I6",
        "C7", "D7", "E7", "F7", "G7", "H7", "I7",
        "D8", "E8", "F8", "G8", "H8",
        "G9", "H9"
    ];

    this.init = function(c, l){
        this.line = l;
        this.column = c;
    };

    this.isValid = function () {
        var coordinate = this.column + this.line;
        return (validCoordinates.indexOf(coordinate) !== -1);
    };

    this.getLine = function () {
        return this.line;
    };

    this.toString = function() {
        return this.getColumn() + this.getLine();
    };

    this.getColumn = function () {
        return this.column;
    };

    this.equal = function (coord) {
        return (this.getLine() === coord.getLine() && this.getColumn() === coord.getColumn());
    };

    this.init(c, l);
};