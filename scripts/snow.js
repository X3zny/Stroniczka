(function () {
    const canvas = document.getElementById("snow-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let flakes = [];

    const FLAKE_COUNT = 110;
    const MAX_SIZE = 3.2;
    const MIN_SIZE = 1;
    const SPEED_Y = 0.55;
    const WIND = 0.25;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createFlake() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE,
            speedY: Math.random() * SPEED_Y + 0.35,
            speedX: (Math.random() - 0.5) * WIND,
            opacity: Math.random() * 0.55 + 0.3
        };
    }

    function init() {
        flakes = [];
        for (let i = 0; i < FLAKE_COUNT; i++) {
            flakes.push(createFlake());
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        flakes.forEach(flake => {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            ctx.fill();

            flake.y += flake.speedY;
            flake.x += flake.speedX + Math.sin(flake.y * 0.01) * 0.25;

            if (flake.y > height + 10) {
                flake.y = -10;
                flake.x = Math.random() * width;
            }
            if (flake.x > width + 10) flake.x = -10;
            if (flake.x < -10) flake.x = width + 10;
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
        resize();
        init();
    });

    resize();
    init();
    draw();
})();