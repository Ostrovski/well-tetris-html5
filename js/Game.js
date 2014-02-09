(function(App) {
    App.Game = function(nRows, nCols, renderer) {
        this._nRows = nRows;
        this._nCols = nCols;
        this._blocksStorage = new App.BlocksStorage(this._nCols);
        this._renderer = renderer;
        this._tickSize = 500;
    };

    App.Game.prototype.init = function() {
        this._blocksStorage = new App.BlocksStorage(this._nCols);
        this._figure = App.Figure.nextRand();
    };

    App.Game.prototype.start = function() {
        this._tick = new Date().getTime();

        var self = this, now;

        this._interval = setInterval(function() {
            now = new Date().getTime();
            self._step(now);
            self._render();
        }, 1);
    };

    App.Game.prototype.pause = function() {

    };

    App.Game.prototype.stop = function() {
        clearInterval(this._interval);
        this._interval = null;
        this._renderer.clearScreen();
    };

    App.Game.prototype.moveFigureLeft = function() {
        if (this._figure) {
            this._figure.moveLeft(this._blocksStorage, 0);
        }
    };

    App.Game.prototype.moveFigureRight = function() {
        if (this._figure) {
            this._figure.moveRight(this._blocksStorage, this._nCols - 1);
        }
    };

    App.Game.prototype.moveFigureDown = function() {
        if (this._figure) {
            this._tryMoveFigureDown();
        }
    };

    App.Game.prototype.rotateFigure = function() {
        if (this._figure) {
            this._figure.rotate(this._blocksStorage);
        }
    };

    App.Game.prototype._render = function() {
        this._renderer.clearScreen();

        if (!this._blocksStorage.isEmpty()) {
            this._blocksStorage.render(this._renderer);
        }

        if (this._figure) {
            this._figure.render(this._renderer);
        }
    };

    App.Game.prototype._step = function(now) {
        this._tick = now;

        if (!this._prevTick || this._tick - this._prevTick >= this._tickSize) {
            if (this._detectCollisions()) {
                this._transformFigureToBlocks();
                this._tryBurnLines();
                this._figure = App.Figure.nextRand();
            } else {
                this._tryMoveFigureDown();
            }

            this._prevTick = this._tick;
        }
    };

    App.Game.prototype._detectCollisions = function() {
        if (!this._figure) {
            return false;
        }

        return this._checkCollisionWithFloor() || this._checkCollisionWithBlocks();
    };

    App.Game.prototype._checkCollisionWithBlocks = function() {
        return this._blocksStorage.detectCollisions(this._figure);
    };

    App.Game.prototype._checkCollisionWithFloor = function() {
        return this._figure.isAtFloor(this._nRows - 1);
    };

    App.Game.prototype._transformFigureToBlocks = function() {
        this._figure.saveBlocks(this._blocksStorage);
    };

    App.Game.prototype._tryMoveFigureDown = function() {
        if (!this._figure.moveDown(this._blocksStorage, this._nRows - 1)) {
            this._transformFigureToBlocks();
            this._tryBurnLines();
            this._figure = App.Figure.nextRand();
        }
    };

    App.Game.prototype._tryBurnLines = function() {
        console.log(this._blocksStorage.burnCompletedLines());
    };
})(TetrisApp);
