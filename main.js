const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');


// Settings 

let circle;

// utility functions
const init = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
init();


const generateRandomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const circleArray = [];

const animate = () => {
  requestAnimationFrame(animate);
  circleArray.forEach(circle => circle.draw());
}

// Classes 

class Circle{
  constructor(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(){
    context.strokeStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.stroke();
  }

}

for (let i = 0; i < 10; i++) {
  console.log(canvas.height)
  let radius = generateRandomBetween(10, 50);
  let x = generateRandomBetween(radius, canvas.width - radius );
  let y = generateRandomBetween(radius, canvas.height- radius);
  let circle = new Circle(x, y, radius, 'red');
  for (let j = 0; j < circleArray.length; j++) {
    if(x + radius > circleArray[j].x - circleArray[j].radius   && x - radius < circleArray[j].x + circleArray[j].radius){
      if (circle + radius > circleArray[j].y - circleArray[j].radius   && circle - radius < circleArray[j].y + circleArray[j].radius) {
        console.log('toched')
      }
    }  
    
  }
  circle = new Circle(x, y, radius, 'red');
  circleArray.push(circle);
  
}

//  Event listners
window.addEventListener('resize', init);

context.arc(500, 500, 50, 0, Math.PI * 2, false);

animate();