"use strict";

Tintas.Player = {PLAYER1: 0, PLAYER2: 1};

var Engine = function () {
    this.majColors = function () {
        var color;
        for (color = 0; color < this.availableColors.length; color += 1) {
            this.majArrayColors(color, 7);
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

    this.getPositionPiece = function () {
        return this.positionPiece;
    };

    this.setPositionPiece = function (coord) {
        this.positionPiece = coord;
    };

    this.increaseColorPieceOfPlayer = function (color) {
        if (color < 7) {
            if (this.getCurrentPlayer() === Tintas.Player.PLAYER1)
                this.piecesPlayer1[color]++;
            else
                this.piecesPlayer2[color]++;
        }
    };

    this.putPiece = function (coordinate) {
        if (coordinate.isValid()) {
            var colorInter = this.getIntersection(coordinate).getColor();
            this.positionPiece = coordinate;
            this.getIntersection(this.positionPiece).setColor(Tintas.Color.BLACK);
            this.increaseColorPieceOfPlayer(colorInter);
        }
    };

    this.move = function (newCoordinate) {
        if (!newCoordinate.isValid() || !this.isMoveValid(newCoordinate) || newCoordinate.equal(this.getPositionPiece()))
            return false;
        this.getIntersection(this.getPositionPiece()).setColor(Tintas.Color.TRANSPARENT);
        var newColor = this.getIntersection(newCoordinate).getColor();
        this.increaseColorPieceOfPlayer(newColor);
        this.getIntersection(newCoordinate).setColor(Tintas.Color.BLACK);
        this.setPositionPiece(newCoordinate);
        this.currentPlayer = !this.currentPlayer;
        return true;
    };

    this.isMoveValid = function (newCoordinate) {
        var voisins = this.getVoisins(this.getPositionPiece());
        var i = 0;
        for(i=0;i<voisins.length;i++){
            if(voisins[i].equal(newCoordinate)){
                return true;
            }
        }
        return false;
    };

    this.getVoisins = function (base) {
        var voisinsBase = [];
        var dir;
        var interCoord;
        for (dir = 0; dir < 6; dir++) {
            var currentLine = base.getLine();
            var currentColumn = base.getColumn();
            do {
                interCoord = null;
                var voisins = [
                    [currentLine + 1, currentColumn],
                    [currentLine - 1, currentColumn],
                    [currentLine + 1, String.fromCharCode(currentColumn.charCodeAt(0) + 1)],
                    [currentLine, String.fromCharCode(currentColumn.charCodeAt(0) - 1)],
                    [currentLine, String.fromCharCode(currentColumn.charCodeAt(0) + 1)],
                    [currentLine - 1, String.fromCharCode(currentColumn.charCodeAt(0) - 1)]
                ];
                currentLine = voisins[dir][0];
                currentColumn = voisins[dir][1];
                var voisinCoord = new Coordinates(currentColumn, currentLine);
                if (voisinCoord.isValid()) {
                    interCoord = this.getIntersection(voisinCoord);
                    if (interCoord && interCoord.getState() !== Tintas.State.VACANT) {
                        voisinsBase.push(voisinCoord);
                        break;
                    }
                }
            } while (interCoord && interCoord.getState() === Tintas.State.VACANT);
        }

        return voisinsBase;
    };


    this.getCurrentPlayer = function () {
        return this.currentPlayer;
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

    this.initialize = function () {
        this.availableColors = [0, 1, 2, 3, 4, 5, 6];
        this.intersections = [];
        this.nbColors = [0, 0, 0, 0, 0, 0, 0];
        this.currentPlayer = Math.floor(Math.random() * 2);
        this.positionPiece = null;
        this.piecesPlayer1 = [0, 0, 0, 0, 0, 0, 0];
        this.piecesPlayer2 = [0, 0, 0, 0, 0, 0, 0];
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        var indexLetter, line, coord;
        for (indexLetter = 0; indexLetter < letters.length; indexLetter += 1) {
            for (line = 1; line < 10; line += 1) {
                coord = new Coordinates(letters[indexLetter], line);
                this.initializeInter(coord);
            }
        }
    };

    this.initialize();


};