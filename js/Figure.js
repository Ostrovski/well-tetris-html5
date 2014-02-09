(function(App) {
    function _rotateI(aBlocks, degree) {
        var x, y, i, l;

        if (90 === degree) {
            x = aBlocks[2].x;
            y = aBlocks[2].y;

            for (i = 0, l = aBlocks.length; i < l; i++) {
                aBlocks[i].x = x;
                aBlocks[i].y = y + i;
            }

            return;
        }

        if (180 === degree) {
            x = aBlocks[2].x - 2;
            y = aBlocks[2].y;

            for (i = 0, l = aBlocks.length; i < l; i++) {
                aBlocks[i].x = x + i;
                aBlocks[i].y = y;
            }
        }

        if (270 === degree) {
            x = aBlocks[1].x;
            y = aBlocks[1].y - 1;

            for (i = 0, l = aBlocks.length; i < l; i++) {
                aBlocks[i].x = x;
                aBlocks[i].y = y + i;
            }
        }

        if (0 === degree) {
            x = aBlocks[1].x - 1;
            y = aBlocks[1].y;

            for (i = 0, l = aBlocks.length; i < l; i++) {
                aBlocks[i].x = x + i;
                aBlocks[i].y = y;
            }
        }
    }

    function _makeBlocksI(x, y, degree) {
        var blocks = [
            {x: x - 1, y: y},
            {x: x, y: y},
            {x: x + 1, y: y},
            {x: x + 2, y: y}
        ];

        for (var i = 90; i <= degree; i += 90) {
            blocks = _rotateI(blocks, i);
        }

        return blocks;
    }

    App.Figure = function(type, blocks, degree) {
        this._type = type;
        this._blocks = blocks;
        this._rotate = rotationsMap[type];
        this._degree = degree;
    };

    App.Figure.create = function(type, x, y, degree) {
        var blocks;

        switch (type) {
            case App.Figure.TYPE_I:
                blocks = _makeBlocksI(x, y, degree);
                break;
            case App.Figure.TYPE_L:
                break;
            case App.Figure.TYPE_J:
                break;
            case App.Figure.TYPE_O:
                break;
            case App.Figure.TYPE_S:
                break;
            case App.Figure.TYPE_T:
                break;
            case App.Figure.TYPE_Z:
                break;
            default:
                throw new Error('Unknown figure type.');
        }

        return new App.Figure(type, blocks, degree);
    };

    App.Figure.nextRand = function() {
        return App.Figure.create(App.Figure.TYPE_I, 4, 0, 0);
    };

    App.Figure.prototype.isAtFloor = function(bottomBorder) {
        for (var i = 0, ii = this._blocks.length; i < ii; i++) {
            if (this._blocks[i].y >= bottomBorder) {
                return true;
            }
        }

        return false;
    };

    App.Figure.prototype.detectCollision = function(block) {
        for (var i = 0, ii = this._blocks.length; i < ii; i++) {
            if (block.x == this._blocks[i].x && block.y === this._blocks[i].y) {
                return true;
            }
        }

        return false;
    };

    App.Figure.prototype.moveDown = function(blocksStorage, bottomBorder) {
        this._saveState();

        for (var i = 0, l = this._blocks.length; i < l; i++) {
            this._blocks[i].y++;
            if (this._blocks[i].y > bottomBorder) {
                this._restoreState();
                return false;
            }
        }

        return this._acceptStateIfNoCollisions(blocksStorage);
    };

    App.Figure.prototype.moveLeft = function(blocksStorage, leftBorder) {
        this._saveState();

        for (var i = 0, l = this._blocks.length; i < l; i++) {
            this._blocks[i].x--;
            if (this._blocks[i].x < leftBorder) {
                this._restoreState();
                return false;
            }
        }

        return this._acceptStateIfNoCollisions(blocksStorage);
    };

    App.Figure.prototype.moveRight = function(blocksStorage, rightBorder) {
        this._saveState();

        for (var i = 0, l = this._blocks.length; i < l; i++) {
            this._blocks[i].x++;
            if (this._blocks[i].x > rightBorder) {
                this._restoreState();
                return false;
            }
        }

        return this._acceptStateIfNoCollisions(blocksStorage);
    };

    App.Figure.prototype.rotate = function() {
        var degree = (this._degree + 90) % 360;
        this._rotate(this._blocks, degree);
        this._degree = degree;
    };

    App.Figure.prototype.render = function(renderer) {
        renderer.renderBlocks(this._blocks);
    };

    App.Figure.prototype.saveBlocks = function(blocksStorage) {
        for (var i = 0, l = this._blocks.length; i < l; i++) {
            blocksStorage.addBlock({x: this._blocks[i].x, y: this._blocks[i].y});
        }
    };

    App.Figure.prototype._restoreState = function() {
        if (this._savedState) {
            this._blocks = this._savedState.blocks;
        }
    };

    App.Figure.prototype._saveState = function() {
        this._savedState = {blocks: []};

        for (var i = 0, l = this._blocks.length; i < l; i++) {
            this._savedState.blocks.push({x: this._blocks[i].x, y: this._blocks[i].y});
        }
    };

    App.Figure.prototype._acceptStateIfNoCollisions = function(blocksStorage) {
        if (blocksStorage.detectCollisions(this)) {
            this._restoreState();
            return false;
        }

        return true;
    };

    App.Figure.TYPE_I = 'I';
    App.Figure.TYPE_L = 'L';
    App.Figure.TYPE_J = 'J';
    App.Figure.TYPE_O = 'O';
    App.Figure.TYPE_S = 'S';
    App.Figure.TYPE_T = 'T';
    App.Figure.TYPE_Z = 'Z';

    var rotationsMap = {};
    rotationsMap[App.Figure.TYPE_I] = _rotateI;
})(TetrisApp);