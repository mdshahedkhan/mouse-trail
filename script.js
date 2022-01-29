const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let slots = [];
let hue = 0;
const mouse = {
  x: undefined,
  y: undefined,
};
canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 3; i++) {
    slots.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 2 + 0.1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = "hsl(" + hue + ", 100%, 50%";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.03;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticle() {
  for (let i = 0; i < slots.length; i++) {
    slots[i].update();
    slots[i].draw();
    for (let j = 0; j < slots.length; j++) {
      const dx = slots[i].x - slots[j].x;
      const dy = slots[i].y - slots[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 90) {
        ctx.beginPath();
        ctx.strokeStyle = slots[i].color;
        ctx.lineWidth = slots[i].size / 10;
        ctx.moveTo(slots[i].x, slots[i].y);
        ctx.lineTo(slots[j].x, slots[j].y);
        ctx.stroke();
      }
    }
    if (slots[i].size < 0.3) {
      slots.splice(i, 1);
      i--;
    }
  }
}

function Animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  requestAnimationFrame(Animate);
}

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});
Animate();
