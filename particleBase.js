const canvas = document.getElementById('canvas1');

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const numberOfParticles = 200;

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
context.font = '40px Verdana';
context.fillText('A', 0, 30);

const data = context.getImageData(0,0,100,100)


class Particles{
    constructor(x,y) {
        this.x = x ;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }

    draw(){
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            this.size = 50;
        }
        else {
            this.size = 3;
        }
    }
}

function init(){
    particleArray = [];
    for (let i =0; i < 500; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particles(x, y))
    }
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