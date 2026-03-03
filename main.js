class GameArea {
    constructor() {
        this.canvas = document.getElementById("canvas");
    }

    start() {
        this.canvas.width = window.innerWidth-300
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        // document.body.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        this.drawGrade();
    }  

    stop() {
        clearInterval(this.interval);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGrade() {
        let ctx = this.context;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        for (let x = 0; x < this.canvas.width; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.canvas.width, y);
            ctx.stroke();
        }
    }
}

class Component {
    constructor(x, y, width, height, color, gameArea) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bottom = y + height;
        this.speedX = 0;
        this.speedY = 0;
        this.color = color;
        this.gameArea = gameArea;
        this.gameArea.context.fillStyle = color;
        this.shape = "rect";
    }

    rect() {
        let ctx = this.gameArea.context;
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 64, 64)";
        ctx.shadowColor = "rgb(255, 64, 64)";
        ctx.shadowBlur = 20;
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

    circle() {
        let ctx = this.gameArea.context;
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(0, 255, 255)";
        ctx.shadowColor = "rgb(0, 255, 255)";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.closePath();
    }

    triangle() {
        let ctx = this.gameArea.context;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fillStyle = "rgb(255, 211, 0)";
        ctx.shadowColor = "rgb(255, 211, 0)";
        ctx.shadowBlur = 20;
        ctx.fill();
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }

    update() {
        let ctx = this.gameArea.context;
        if (this.shape === "rect") {
            this.rect();
        } else if (this.shape === "circle") {
            this.circle();
        } else if (this.shape === "triangle") {
            this.triangle();
        }
    }

    moveToBeginning() {
        if (this.y > this.gameArea.canvas.height) {
            this.y = -this.height;
        }
    }
    
}

let myGameArea;
let myGamePiece;
let pieces;

function startGame() {
    myGameArea = new GameArea();
    myGameArea.start();
    pieces = generateMultiplePieces(400);
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.drawGrade()
    for(let e of pieces) {
        // e.speedY = 1;
        e.newPos();
        e.update();
        e.moveToBeginning();
    }
}

function generateMultiplePieces(numberOfPieces = 5) {
    let pieces = [];
    for (let i = 0; i < numberOfPieces; i++) {
        let x = Math.random() * (myGameArea.canvas.width);
        let y = Math.random() * (myGameArea.canvas.height);
        let piece = new Component(x, y, 10, 10, "blue", myGameArea);
        let randomNumber = Math.random();
        while (!(randomNumber > 0.1 && randomNumber < 0.5)) {
            randomNumber = Math.random();
        }
        piece.speedY = randomNumber * 2;
        pieces.push(piece);
    }
    return pieces;
}

function toggleToRect() {
    for(let e of pieces) {
        e.shape = "rect";
    }
}

function toggleToCircle() {
    for(let e of pieces) {
        e.shape = "circle";
    }
}

function toggleToTriangle() {
    for(let e of pieces) {
        e.shape = "triangle";
    }   
}

function togglePlayPause() {
    const playPauseButton = document.getElementById("play-pause");
    if (playPauseButton.textContent === "PAUSE") {
        playPauseButton.textContent = "PLAY";
        myGameArea.stop();
    } else {
        playPauseButton.textContent = "PAUSE";
        myGameArea.start();
    }
}