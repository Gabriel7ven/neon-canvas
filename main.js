import { gameArea } from './gameArea.js';
import Component from './component.js';

function startGame() {
    gameArea.start();
    gameArea.pieces = generateMultiplePieces(200);
}

function generateMultiplePieces(numberOfPieces = 5) {
    let pieces = [];
    for (let i = 0; i < numberOfPieces; i++) {
        let x = Math.random() * (gameArea.canvas.width);
        let y = Math.random() * (gameArea.canvas.height);
        let piece = new Component(x, y, 10, 10, "blue");
        let randomNumber = Math.random();
        piece.speedY = randomNumber * 2;
        pieces.push(piece);
    }
    return pieces;
}

function toggleShape(shape) {
    for(let piece of gameArea.pieces) {
        piece.shape = shape;
    }
}

function togglePlayPause() {
    const playPauseButton = document.getElementById("play-pause");
    if (playPauseButton.textContent === "PAUSE") {
        playPauseButton.textContent = "PLAY";
        gameArea.stop();
    } else {
        playPauseButton.textContent = "PAUSE";
        gameArea.start();
    }
}

window.toggleShape = toggleShape;
window.togglePlayPause = togglePlayPause;

document.addEventListener("DOMContentLoaded", function() {
    startGame();
});