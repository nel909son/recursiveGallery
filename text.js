const canvas = document.getElementById('canvas1');

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const numberOfParticles = 200;
let adjustX = 10;
let adjustY = 20;

//mouse position

let mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    

    //console.log(mouse.x, mouse.y)
});

context.fillStyle = 'white';
context.font = '20px Verdana';
context.fillText('recursive', 0, 30);

const textCors = context.getImageData(0,0,100,100)


class Particles{
    constructor(x,y) {
        this.x = x ;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 10;
    }

    draw(){
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx /distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx / 5;
            }
            if (this.y !== this.baseY){
                let dx = this.y - this.baseY;
                this.y -= dx/5;
            }
        }
    }
}

function init(){
    particleArray = [];
    for ( let y =0, y2 = textCors.height; y < y2; y++){
        for (let x = 0, x2 = textCors.width; x < x2; x++){
            if (textCors.data[(y * 4 * textCors.width) + (x * 4) + 3] > 128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particles(positionX * 10,positionY * 10))
        }}}
}

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}


init();
animate();