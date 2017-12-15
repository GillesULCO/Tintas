"use strict";

Tintas.State = {VACANT: 0, FULL: 1};
Tintas.Color = {WHITE: 0, RED: 1, PURPLE: 2, ORANGE: 3, YELLOW: 4, BLUE: 5, GREEN: 6, BLACK: 7, TRANSPARENT: 8};

var Intersection = function (coordinate, color) {

    this.getCoord = function() {
        return this.coord;
    };

    this.getLine = function() {
        return coordinate.getLine();
    };

    this.getColumn =function() {
        return coordinate.getColumn();
    };

    this.getColor = function(){
        return this.color;
    };

    this.setColor = function(color){
        this.color = color;
        this.updateState();
    };

    this.setState = function(state){
        this.state = state;
    };

    this.getState = function() {
        return this.state;
    };

    this.updateState = function() {
        if(this.getColor() === Tintas.Color.TRANSPARENT){
            this.setState(Tintas.State.VACANT);
        }else{
            this.setState(Tintas.State.FULL);
        }
    };

    this.init = function () {
        this.coord = coordinate;
        if(color === null || color === undefined) {
            this.state = Tintas.State.VACANT;
            this.color = Tintas.Color.TRANSPARENT;
        }else{
            this.state = Tintas.State.FULL;
            this.color = color;
        }
    };

    this.toString = function() {
        return this.getColumn() + this.getLine();
    };

    this.init();
};