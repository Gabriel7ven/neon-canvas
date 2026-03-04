import { gameArea } from './gameArea.js';

const SHAPE_STYLES = {
    rect: { fill: 'rgb(255, 64, 64)', shadow: 'rgb(255, 64, 64)' },
    circle: { fill: 'rgb(0, 255, 255)', shadow: 'rgb(0, 255, 255)' },
    triangle: { fill: 'rgb(255, 211, 0)', shadow: 'rgb(255, 211, 0)' }
};

export default class Component {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.shape = "rect";
    }

    _setStyle(style) {
        let ctx = gameArea.context;
        ctx.fillStyle = style.fill;
        ctx.shadowColor = style.shadow;
        ctx.shadowBlur = 20;
    }

    rect() {
        let ctx = gameArea.context;
        this._setStyle(SHAPE_STYLES.rect);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    circle() {
        let ctx = gameArea.context;
        this._setStyle(SHAPE_STYLES.circle);
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    triangle() {
        let ctx = gameArea.context;
        this._setStyle(SHAPE_STYLES.triangle);
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }

    update() {
        if (this.shape === "rect") {
            this.rect();
        } else if (this.shape === "circle") {
            this.circle();
        } else if (this.shape === "triangle") {
            this.triangle();
        }
    }

    moveToBeginning() {
        if (this.y > gameArea.canvas.height) {
            this.y = -this.height;
        }
    }
}