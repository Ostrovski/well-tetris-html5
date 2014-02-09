(function(App) {
    App.InputProcessor = function(game) {
        this._game = game;

        this._keyMap = {
            37: this.leftKeyPress,
            38: this.rotateKeyPress,
            39: this.rightKeyPress,
            40: this.downKeyPress
        };
    };

    App.InputProcessor.prototype.keyPress = function(e) {
        if (this._keyMap[e.keyCode]) {
            e.preventDefault();
            this._keyMap[e.keyCode].call(this);
        }
    };

    App.InputProcessor.prototype.leftKeyPress = function() {
        this._game.moveFigureLeft();
    };

    App.InputProcessor.prototype.rightKeyPress = function() {
        this._game.moveFigureRight();
    };

    App.InputProcessor.prototype.downKeyPress = function() {
        this._game.moveFigureDown();
    };

    App.InputProcessor.prototype.rotateKeyPress = function() {
        this._game.rotateFigure();
    };
})(TetrisApp);