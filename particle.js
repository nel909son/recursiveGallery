window.onload=function() {
let canvas = document.getElementById('canvas1');

let context = canvas.getContext('2d');

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;
let gooAnimation;
let particleArray = [];
const numberOfParticles = 200;


//mouse position


//mouse position



let mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
  
    //console.log(mouse.x, mouse.y)
});

window.addEventListener('resize', function() {
    cancelAnimationFrame(gooAnimation)
    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;
    particleArray =[];
    init()
    animate();
   


})

setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);

class Particles {
    constructor(x, y, size, color, weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }
    update(){
        this.size -= 0.05;
        if ( this.size < 0) {
            this.x = (mouse.x + ((Math.random() * 20) -10));
            this.y = (mouse.y + ((Math.random() * 20) -10));
            this.size = (Math.random() * 10) + 20;
            this.weight = (Math.random() * 1) - 0.2;
        }
        //partcles fall due to weight
        this.y += this.weight;
        this.weight += 0.01;

        //bounce
        if (this.y > canvas.height - this.size){
            this.weight *= -.4;
        };

    }
}

function init(){
    particleArray = [];
    for (let i = 0; i < numberOfParticles; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 5) + 20;
        let color = '#39FF14';
        let weight = 1;
        particleArray.push(new Particles(x, y, size, color, weight));
    }
   
}

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
   gooAnimation = requestAnimationFrame(animate);
 
}
init();
animate();



}