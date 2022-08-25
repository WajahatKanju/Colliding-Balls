const canvas = document.getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");

// Settings

let circle;
let particles = [];
let colors = [
  "#f72585",
  "#b5179e",
  "#7209b7",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4361ee",
  "#4895ef",
  "#4cc9f0",
];

const totalParticles = 120;
const radiusMin = 25;
const radiusMax = 50;

// utility functions
const init = () => {
  particles = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (let i = 0; i < totalParticles; i++) {
    let radius = generateRadomInt(radiusMin, radiusMax);
    let x = generateRadomInt(radius, window.innerWidth - radius);
    let y = generateRadomInt(radius, window.innerHeight - radius);
    let color = colors[generateRadomInt(0, colors.length)];
    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (
          gap(x, y, particles[j].x, particles[j].y) -
            (radius + particles[j].radius) <
          0
        ) {
          radius = generateRadomInt(radiusMin, radiusMax);
          x = generateRadomInt(radius, window.innerWidth - radius);
          y = generateRadomInt(radius, window.innerHeight - radius);
          j = -1;
        }
      }
    }
    particles.push(new Circle(x, y, radius, color));
  }
};

const gap = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const generateRadomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  particles.forEach((particle) => particle.update());
};

const negate = (n) => (Math.random() > 0.5 ? n : -n);

const rotate = (velocity, angle) => {
  return {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };
};

const resolveCollision = (particle_a, particle_b) => {
  const xVelocityDifference = particle_a.velocity.x - particle_b.velocity.x;
  const yVelocityDifference = particle_a.velocity.y - particle_b.velocity.y;

  const xDistance = particle_b.x - particle_a.x;
  const yDistance = particle_b.y - particle_a.y;
  if (xVelocityDifference * xDistance + yVelocityDifference * yDistance >= 0) {
    const angle = -Math.atan2(
      particle_b.y - particle_a.y,
      particle_b.x - particle_b.x
    );

    const m1 = particle_a.mass;
    const m2 = particle_b.mass;

    const u1 = rotate(particle_a.velocity, angle);
    const u2 = rotate(particle_b.velocity, angle);

    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: (u1.y * (m1 - m2)) / m1 + (m2 * 2 * m2 * u2.y) / (m1 + m2),
    };

    // u1 (m1 - m2) +
    //  m1-m2
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: (u2.y * (m1 - m2)) / m1 + (m2 * 2 * m2 * u1.y) / (m1 + m2),
    };

    const vFinal_1 = rotate(v1, -angle);
    const vFinal_2 = rotate(v2, -angle);

    particle_a.velocity.x = vFinal_1.x;
    particle_a.velocity.y = vFinal_1.y;

    particle_b.velocity.x = vFinal_2.x;
    particle_b.velocity.y = vFinal_2.y;
  }
};

// Classes

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = { x: negate(Math.random()), y: negate(Math.random()) };
    this.mass = generateRadomInt(1, 2);
  }

  draw() {
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.stroke();
  }
  update() {
    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) {
        continue;
      }
      if (
        gap(this.x, this.y, particles[i].x, particles[i].y) -
          (this.radius + particles[i].radius) <
        0
      ) {
        resolveCollision(this, particles[i]);
      }
    }
    if (
      this.x + this.velocity.x + this.radius < this.radius * 2 ||
      this.x + this.velocity.x + this.radius > canvas.width
    ) {
      this.velocity.x *= -1;
    }
    if (
      this.y + this.velocity.y + this.radius < this.radius * 2 ||
      this.y + this.velocity.y + this.radius > canvas.height
    ) {
      this.velocity.y *= -1;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

//  Event listners
window.addEventListener("resize", init);

animate();
init();
