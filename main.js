const canvas = document.getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");

// Settings

let circle;
let circleArray = [];

// utility functions
const init = () => {
  circleArray = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (let i = 0; i < 70; i++) {
    console.log(i)
    let radius =generateRandomBetween(30, 60);
    let x = generateRandomBetween(radius, window.innerWidth - radius);
    let y = generateRandomBetween(radius, window.innerHeight - radius);
    let color = "blue";
    debugger;
    if (i !== 0) {
      for (let j = 0; j < circleArray.length; j++) {
        console.log(j);
        if(j === 0){
          color = 'blue';
        }
        if (
          calculateDistance(x, y, circleArray[j].x, circleArray[j].y) - (radius + circleArray[j].radius) < 0
        ) {
          radius = generateRandomBetween(30, 60);
          x = generateRandomBetween(radius, window.innerWidth - radius);
          y = generateRandomBetween(radius, window.innerHeight - radius);
          color = 'pink';
          j = 0;
        }
      }
    };
    circleArray.push(new Circle(x, y, radius, color));
  }
};

const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const generateRandomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const animate = () => {
  requestAnimationFrame(animate);
  circleArray.forEach((circle) => circle.draw());
};

// Classes

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.strokeStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.stroke();
  }
}

//  Event listners
window.addEventListener("resize", init);

context.arc(500, 500, 50, 0, Math.PI * 2, false);

animate();
init();
