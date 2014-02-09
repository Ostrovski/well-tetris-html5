(function(App) {
    'use strict';

    var nRows = 20,
        nCols = 10,
        blockWidth = 20,
        blockHeight = 20,
        canvas = document.getElementById('game'),
        renderer = new App.Renderer(canvas, nRows, nCols, blockWidth, blockHeight),
        game = new App.Game(nRows, nCols, renderer),
        inputProcessor = new App.InputProcessor(game);

    document.onkeydown = function(e) {
        inputProcessor.keyPress(e || window.event);
    };

    game.init();
    game.start();
})(TetrisApp);