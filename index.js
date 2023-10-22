

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
// canvas.width = innerWidth - 4
// canvas.height = innerHeight - 4

const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

// Llama a la función de redimensionamiento al cargar la página y cuando la ventana se redimensiona
window.addEventListener('load', resizeCanvas)
window.addEventListener('resize', resizeCanvas)
const ctx = canvas.getContext("2d")

const KEYS = {};

class Ship {
    constructor() {
        this.w = 100
        this.h = 80
        this.position = {
        x: canvas.width / 2,
        y: canvas.height / 2 
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.friction = 0.9
        this.url = "./images/nave-espacial.png"
        this.image = new Image()
        this.image.src = this.url;
        this.image.onload = this.draw
    }

    update() {
        this.draw();
        this.move();
    }

    watchBorders() {
        if (this.position.x < 0) {
            this.position.x = canvas.width - this.w
        } else if (this.position.x > canvas.width - this.w) {
            this.position.x = 0
        }
        if (this.position.y < 0) {
            this.position.y = canvas.height - this.h
        } else if (this.position.y > canvas.height - this.h) {
            this.position.y = 0
        }
    }

    move() {
        if (KEYS["ArrowRight"]) {
            this.velocity.x++
        }
        if (KEYS["ArrowLeft"]) {
            this.velocity.x--
        }
        if (KEYS["ArrowDown"]) {
            this.velocity.y++
        }
        if (KEYS["ArrowUp"]) {
            this.velocity.y--
        }
        this.position.x += this.velocity.x;
        this.velocity.x *= this.friction
        this.position.y += this.velocity.y;
        this.velocity.y *= this.friction
        this.watchBorders()
    }

    draw() {
        if(!this.image) {
            return
        }

        //rotation
        ctx.save()
        if(KEYS['ArrowLeft']) {
            ctx.translate(this.position.x + this.w / 2, this.position.y + this.h / 2)
            ctx.rotate(-0.15)
            ctx.translate(-this.position.x - this.w / 2, -this.position.y - this.h / 2)
        } else if(KEYS['ArrowRight']) {
            ctx.translate(this.position.x + this.w / 2, this.position.y + this.h / 2)
            ctx.rotate(0.15)
            ctx.translate(-this.position.x - this.w / 2, -this.position.y - this.h / 2)
        }
        ctx.drawImage(this.image, this.position.x, this.position.y, this.w, this.h)
        ctx.restore( )
    }
}


//aux
const drawStars = (number = 1) => {

    for (let i = 0; i < number; i++) {
        let x = Math.floor(Math.random() * canvas.width)
        let y = Math.floor(Math.random() * canvas.height)
        ctx.fillStyle = "white"
        ctx.fillRect(x, y, 1, 3)
        ctx.fillRect(--x, ++y, 3, 1)
    }
}

const drawBG = () => {
    ctx.fillStyle = "#323232"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawStars(12)
}


//instances

const ship = new Ship()

const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBG()
    ship.update()
    requestAnimationFrame(update)
}

//key listener
addEventListener("keydown", e => {
    console.log(e.key)
    KEYS[e.key] = true
});
addEventListener("keyup", e => {
    KEYS[e.key] = false
});

update()