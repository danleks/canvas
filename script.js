// Define global context for canvas
const canvas = document.querySelector("#playground");
const ctx = canvas.getContext("2d");
const MAX_PARTICLES = 500;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const particles = [];

const create = (coordinatesObj) => {
    coordinates = coordinatesObj || {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 50,
    }
    if (particles.length > MAX_PARTICLES) {
        particles.shift();
    }

    let p = {
        x: coordinates.x,
        y: coordinates.y,
        xVel: (Math.random() - .5),
        yVel: (Math.random() - .5),
        radius: coordinates.radius,
        color: `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`,
    }

    particles.push(p);
}

const draw = (p) => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

};

const move = (p) => {
    p.x += p.xVel;
    p.y += p.yVel;
};

const fade = (p) => {
    p.radius *= .9966;
}

const loop = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    create();
    particles.forEach((p) => {
        fade(p);
        draw(p);
        move(p);
    })
    window.requestAnimationFrame(loop);
};


loop();
canvas.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
        create({
            x: e.clientX,
            y: e.clientY,
            radius: 30,
        });
    }
}, false);