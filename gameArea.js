export const gameArea = {

    canvas : document.getElementById("canvas"),
    pieces: [],
    
    start() {
        if (!this.canvas) {
            console.error("Canvas not found!");
            return;
        }
        this.canvas.width = window.innerWidth - 50;
        this.canvas.height = window.innerHeight - 300;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(() => this.update(), 20);
    },  


    stop() {
        this.isRunning = false;
            clearInterval(this.interval);
    },

    update() {
        this.clear();
        this.drawGrid();
        for(let piece of this.pieces) {
            piece.newPos();
            piece.update();
            piece.moveToBeginning();
        }
        
    },

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawGrid() {
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
