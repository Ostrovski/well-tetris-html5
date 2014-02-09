(function(App) {
    App.BlocksStorage = function(lineLength) {
        this._lineLen = lineLength;
        this._blocks = {};
    };

    App.BlocksStorage.prototype.addBlock = function(block) {
        this._blocks[block.y] = this._blocks[block.y] || [];
        this._blocks[block.y].push(block);
    };

    App.BlocksStorage.prototype.burnCompletedLines = function() {
        var aBurned = this._burnLines();
        if (aBurned.length) {
            this._correctLinesAfterBurning(aBurned);
        }

        return aBurned.length;
    };

    App.BlocksStorage.prototype.detectCollisions = function(figure) {
        var aLine;
        for (var k in this._blocks) {
            if (this._blocks.hasOwnProperty(k)) {
                aLine = this._blocks[k];
                for (var i = 0, ii = aLine.length; i < ii; i++) {
                    if (figure.detectCollision(aLine[i])) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    App.BlocksStorage.prototype.isEmpty = function() {
        return 0 === Object.keys(this._blocks).length;
    };

    App.BlocksStorage.prototype.render = function(renderer) {
        for (var k in this._blocks) {
            if (this._blocks.hasOwnProperty(k)) {
                renderer.renderBlocks(this._blocks[k]);
            }
        }
    };

    App.BlocksStorage.prototype._burnLines = function() {
        var line, aBurned = [];

        for (var k in this._blocks) {
            if (this._blocks.hasOwnProperty(k)) {
                line = this._blocks[k];
                if (this._lineLen <= line.length) {
                    aBurned.push(k);
                    delete this._blocks[k];
                }
            }
        }

        return aBurned;
    };

    App.BlocksStorage.prototype._correctLinesAfterBurning = function(aBurned) {
        aBurned.sort();

        var correction, aSortedLines, lineNo;

        aSortedLines = Object.keys(this._blocks);
        aSortedLines.sort();
        aSortedLines = aSortedLines.reverse();

        for (var k = 0, kk = aSortedLines.length; k < kk; k++) {
            lineNo = aSortedLines[k];

            correction = 0;
            for (var i = aBurned.length - 1; i >= 0 && aBurned[i] > lineNo; i--) {
                correction++;
            }

            if (correction) {
                for (var j = 0, jj = this._blocks[lineNo].length; j < jj; j++) {
                    this._blocks[lineNo][j].y += correction;
                }

                this._blocks[+lineNo + correction] = this._blocks[lineNo];
                delete this._blocks[lineNo];
            }
        }
    };
})(TetrisApp);