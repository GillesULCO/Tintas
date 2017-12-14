"use strict";

Tintas.Player = {PLAYER1: 0, PLAYER2: 1};

var Engine = function () {
    this.majColors = function () {
        var color;
        for (color = 0; color < this.availableColors.length; color += 1) {
            this.majArrayColors(color, 3);
        }
    };

    this.majArrayColors = function (color, maxPieces) {
        if (this.nbColors[this.availableColors[color]] === maxPieces) {
            this.availableColors.splice(color, 1);
        }
    };

    this.getRandomColor = function () {
        var randomIndex = Math.floor(Math.random() * this.availableColors.length);
        var randomColor = this.availableColors[randomIndex];
        this.nbColors[randomColor] += 1;

        return randomColor;

    };

    this.initialize = function () {
        this.availableColors = [0, 1, 2, 3, 4, 5, 6];
        this.intersections = [];
        this.nbColors = [0, 0, 0, 0, 0, 0, 0];
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        var indexLetter, line, coord;
        for (indexLetter = 0; indexLetter < letters.length; indexLetter += 1) {
            for (line = 1; line < 10; line += 1) {
                coord = new Coordinates(letters[indexLetter], line);
                this.initializeInter(coord);
            }
        }
    };

    this.initializeInter = function (coord) {
        if (coord.isValid()) {
            var color = this.getRandomColor();
            var inter = new Intersection(coord);
            inter.setColor(color);
            this.majColors();
            this.intersections.push(inter);
        }
    };

    this.initialize();

    this.getIntersections = function () {
        return this.intersections;
    };

    this.getIntersection = function (coord) {
        var inters = this.getIntersections();
        var indexInter;
        for (indexInter = 0; indexInter < inters.length; indexInter += 1) {
            if (
                inters[indexInter].getLine() === coord.getLine() &&
                inters[indexInter].getColumn() === coord.getColumn()
            ) {
                return inters[indexInter];
            }
        }
        return false;
    };


};