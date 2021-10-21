window.onload=function() {
let canvasText = document.getElementById('canvas2');

let contextText = canvasText.getContext('2d');

canvasText.width = 1600;
canvasText.height = 500;

let particleArrayText = [];

let textAnimation;
let adjustX = 10;
let adjustY = 20;

//mouseText position

let mouseText = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function(event){
    
    mouseText.x = event.x;
    mouseText.y = event.y;
    

    //console.log(mouse.x, mouse.y)
});



contextText.font = '1rem Verdana';
contextText.fillText('recursive', 0, 20);

const textCors = contextText.getImageData(0,0,100,100)


class PartcilesText{
    constructor(x,y) {
        this.x = x ;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 10;
    }

    draw(){
        contextText.fillStyle = 'red';
        contextText.beginPath();
        contextText.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        contextText.closePath();
        contextText.fill();
    }

    update() {
        let dx = mouseText.x - this.x;
        let dy = mouseText.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx /distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouseText.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouseText.radius ) {
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

function initText(){
    particleArrayText = [];
    for ( let y =0, y2 = textCors.height; y < y2; y++){
        for (let x = 0, x2 = textCors.width; x < x2; x++){
            if (textCors.data[(y * 4 * textCors.width) + (x * 4) + 3] > 128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArrayText.push(new PartcilesText(positionX * 10,positionY * 10))
        }}}
}

function animateText() {
    contextText.clearRect(0,0,canvasText.width, canvasText.height);
    for (let i = 0; i < particleArrayText.length; i++) {
        
        particleArrayText[i].draw();
        particleArrayText[i].update();
    }
    textAnimation = requestAnimationFrame(animateText);
}


initText();
animateText();
}