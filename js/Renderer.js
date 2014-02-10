(function(App) {
    App.Renderer = function(canvas, nRows, nCols, blockWidth, blockHeight) {
        canvas.width = nCols * blockWidth;
        canvas.height = nRows * blockHeight;

        this._canvas = canvas;
        this._ctx = this._canvas.getContext('2d');
        this._nRos = nRows;
        this._nCols = nCols;
        this._blockWidth = blockWidth;
        this._blockHeight = blockHeight;
    };

    App.Renderer.prototype.clearScreen = function () {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };

    App.Renderer.prototype.renderBlocks = function (aBlocks) {
        for (var i = 0, l = aBlocks.length; i < l; i++) {
            this._renderBlock(aBlocks[i]);
        }
    };

    App.Renderer.prototype._renderBlock = function(block) {
        var x = block.x * this._blockWidth,
            y = block.y * this._blockHeight;

        this._ctx.fillStyle = '#0077CA';
        this._ctx.fillRect(x, y, this._blockWidth, this._blockHeight);

        this._ctx.fillStyle = '#000000';
        this._ctx.fillRect(x + 2, y + 2, this._blockWidth - 4, this._blockHeight - 4);
    };
})(TetrisApp);
