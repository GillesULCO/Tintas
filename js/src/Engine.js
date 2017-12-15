"use strict";

Tintas.Player = {PLAYER1: 0, PLAYER2: 1, NUL: 3};
Tintas.StateEngine = {FIRST_TOUR: 0, IN_GAME:1, END_GAME:2};
Tintas.Mode = {_1V1: 0, _IA: 1};

var Engine = function (mode) {
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

    this.getState = function(){
        return this.state;
    };

    /*this.getLastColor = function(){
        return this.lastColor;
    };

    this.isSamePlayer = function(){
        return this.samePlayer;
    };*/

    this.increaseColorPieceOfPlayer = function (color) {
        if (color < 7) {
            if (this.getCurrentPlayer() === Tintas.Player.PLAYER1)
                this.piecesPlayer1[color]++;
            else
                this.piecesPlayer2[color]++;
        }
    };

    this.changePlayer = function(){
        if(this.getCurrentPlayer() === Tintas.Player.PLAYER1) {
            this.setCurrentPlayer(Tintas.Player.PLAYER2);
        }else if(this.getCurrentPlayer() === Tintas.Player.PLAYER2) {
            this.setCurrentPlayer(Tintas.Player.PLAYER1);
        }

    };

    this.putPiece = function (coordinate) {
        if(this.getMode() === Tintas.Mode._1V1) {
            return this._putPiece(coordinate);
        }else if(this.getMode() === Tintas.Mode._IA){
            if(this.currentPlayer === Tintas.Player.PLAYER2) {
                return this._putPieceIA();
            }else if(this.currentPlayer === Tintas.Player.PLAYER1){
                return this._putPiece(coordinate);
            }
        }
        return false;
    };

    this._putPieceIA = function(){
      var inters = this.getIntersections();
      var indexInter = Math.floor(Math.random() * this.getIntersections().length);
      var coord = inters[indexInter].getCoord();
      return this._putPiece(coord);
    };

    this._putPiece = function(coordinate){
        if (coordinate.isValid() && this.getIntersection(coordinate).getState() !== Tintas.State.VACANT && this.getIntersection(coordinate).getColor() !== Tintas.Color.BLACK) {
            var colorInter = this.getIntersection(coordinate).getColor();
            if(this.positionPiece){
                this.getIntersection(this.positionPiece).setColor(Tintas.Color.TRANSPARENT);
            }
            this.positionPiece = coordinate;
            this.getIntersection(this.positionPiece).setColor(Tintas.Color.BLACK);
            this.increaseColorPieceOfPlayer(colorInter);
            this.state = Tintas.StateEngine.IN_GAME;
            //this.lastColor = this.getIntersection(coordinate).getColor();
            if(this.endOfGame()){
                this.state = Tintas.StateEngine.END_GAME;
                return true;
            }
            this.changePlayer();
           /* if(!this.availableMove(this.positionPiece)) {
                this.changePlayer();
                this.samePlayer = false;
            }else{
                this.samePlayer = true;
            }*/
            return true;
        }
        return false;
    };

    /*this.availableMove = function(coord){
        var voisins = this.getVoisins(coord);
        var i;
        for(i=0;i<voisins.length;i++){
            var coordVoisin = voisins[i];
            if(this.getIntersection(coordVoisin).getColor() === this.getLastColor()) {
                return true;
            }
        }
    };*/

    this.move = function (newCoordinate) {
        if(this.getMode() === Tintas.Mode._1V1) {
            return this._move(newCoordinate);
        }else if(this.getMode() === Tintas.Mode._IA){
            if(this.currentPlayer === Tintas.Player.PLAYER2) {
                return this._moveIA();
            }else if(this.currentPlayer === Tintas.Player.PLAYER1){
                return this._move(newCoordinate);
            }
        }
        return false;
    };

    this._move = function (newCoordinate){
        if (!newCoordinate.isValid() || !this.isMoveValid(newCoordinate) || newCoordinate.equal(this.getPositionPiece()))
            return false;
        this.getIntersection(this.getPositionPiece()).setColor(Tintas.Color.TRANSPARENT);
        var newColor = this.getIntersection(newCoordinate).getColor();
        //this.lastColor = newColor;
        this.increaseColorPieceOfPlayer(newColor);
        this.getIntersection(newCoordinate).setColor(Tintas.Color.BLACK);
        this.setPositionPiece(newCoordinate);
        if(this.getVoisins(newCoordinate).length === 0){
            this.state = Tintas.StateEngine.FIRST_TOUR;
        }
        if(this.endOfGame()){
            this.state = Tintas.StateEngine.END_GAME;
            return true;
        }
        this.changePlayer();
        /*if(!this.availableMove(this.positionPiece)) {
            this.changePlayer();
            this.samePlayer = false;
        }else{
            this.samePlayer = true;
        }*/
        return true;
    };

    this._moveIA = function(){
        var voisins = this.getVoisins(this.getPositionPiece());
        var indexVoisins = Math.floor(Math.random() * voisins.length);
        var coord = this.getIntersections()[indexVoisins].getCoord();
        return this._move(coord);
    };

    this.endOfGame = function() {
        if(this._7Pieces(this.piecesPlayer1) || this._4Pieces4Colors(this.piecesPlayer1)){
            this.currentPlayer = Tintas.Player.PLAYER1;
            return true;
        }
        if(this._7Pieces(this.piecesPlayer2) || this._4Pieces4Colors(this.piecesPlayer2)){
            this.currentPlayer = Tintas.Player.PLAYER2;
            return true;
        }
        if(this.emptyEngine()){
            this.currentPlayer = Tintas.Player.NUL;
            return true;
        }
        return false;
    };

    this.emptyEngine = function(){
      var i;
      var inters = this.getIntersections();
      var nbTransparent = 0 ;
      var nbBlack = 0;
      for (i=0; i<inters.length; i++){
          if(inters[i].getColor() === Tintas.Color.TRANSPARENT)
              nbTransparent++;
          if(inters[i].getColor() === Tintas.Color.TRANSPARENT)
              nbBlack++;
      }

      return (nbBlack === 1 && nbTransparent === 48);
    };

    this._7Pieces = function(arrayPieces){
      var i;
      for (i=0; i < arrayPieces.length ; i++){
          if(arrayPieces[i] === 7)
              return true;
      }
      return false;
    };

    this._4Pieces4Colors = function(arrayPieces){
        var i;
        var count = 0;
        for (i=0; i < arrayPieces.length ; i++){
            if(arrayPieces[i] >= 4)
                count ++;
        }
        return count >= 4;
    };

    this.isMoveValid = function (newCoordinate) {
        var voisins = this.getVoisins(this.getPositionPiece());
        var i;
        for(i=0;i<voisins.length;i++){
            if(voisins[i].equal(newCoordinate)){
                /*if(!this.samePlayer)
                    return true;
                if(this.getIntersection(newCoordinate).getColor !== this.getLastColor()){
                    this.lastColor = null;
                    this.changePlayer();
                    return false;
                }else{*/
                    return true;
                /*}*/
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

    this.setCurrentPlayer = function(player) {
        this.currentPlayer = player;
    };

    this.getMode = function () {
        return this.mode;
    };

    this.getPiecesPlayer = function (player){
        if (player === Tintas.Player.PLAYER1)
            return this.piecesPlayer1;
        else
            return this.piecesPlayer2;
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
        this.state = Tintas.StateEngine.FIRST_TOUR;
        /*this.lastColor = null;
        this.samePlayer = false;*/
        this.nbColors = [0, 0, 0, 0, 0, 0, 0];
        var randomPlayer = Math.floor(Math.random() * 2);
        if(randomPlayer === 0){
            this.currentPlayer=Tintas.Player.PLAYER1;
        }else if(randomPlayer === 1){
            this.currentPlayer=Tintas.Player.PLAYER2;
        }
        this.mode = Tintas.Mode._1V1;
        if(mode){
            this.mode = mode;
        }

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