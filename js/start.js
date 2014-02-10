(function(App) {
    'use strict';

    var nRows = 20,
        nCols = 10,
        blockWidth = 20,
        blockHeight = 20,
        mainCanvas = document.getElementById('game'),
        nextFigureCanvas = document.getElementById('nextFigure'),
        renderer = new App.Renderer(mainCanvas, nRows, nCols, blockWidth, blockHeight),
        toolsRenderer = new App.Renderer(nextFigureCanvas, 4, 4, blockWidth, blockHeight),
        game = new App.Game(nRows, nCols, renderer, toolsRenderer),
        inputProcessor = new App.InputProcessor(game);

    document.onkeydown = function(e) {
        inputProcessor.keyPress(e || window.event);
    };

    game.init();
    game.start();
})(TetrisApp);