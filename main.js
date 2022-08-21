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

for (let i = 0; i < 5; i++) {
  console.log(canvas.height)
  let radius = generateRandomBetween(10, 50);
  let x = generateRandomBetween(radius, canvas.width - radius );
  let y = generateRandomBetween(radius, canvas.height- radius);
  let circle = new Circle(x, y, radius, 'red');
  for (let i = 1; i < circleArray.length; i++) {
    if(circle.x + circle.radius > circleArray[i].x - circleArray[i].radius   && circle.x - circle.radius < circleArray[i].x + circleArray[i].radius){
      if (circle.y + circle.radius > circleArray[i].y - circleArray[i].radius   && circle.y - circle.radius < circleArray[i].y + circleArray[i].radius) {
        console.log('Circle Touching')
      }
    }  
    
  }
  circleArray.push(circle);
  
}

//  Event listners
window.addEventListener('resize', init);

context.arc(500, 500, 50, 0, Math.PI * 2, false);

animate();