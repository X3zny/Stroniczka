document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const video = document.getElementById("background-video");
    const videoSource = document.getElementById("video-source");
    const soundToggle = document.getElementById("sound-toggle");
    const soundIcon = document.getElementById("sound-icon");

    const videos = [
        "media/sound1.webm",
        "media/sound2.webm",
        "media/sound3.webm",
        "media/sound5.webm",
        "media/sound6.webm",
    ];

    function getRandomVideo(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    const randomSrc = getRandomVideo(videos);
    videoSource.src = randomSrc;
    video.load();

    overlay.addEventListener("click", () => {
        video.muted = false;
        video.play();
        overlay.classList.add("hidden");
    });

    soundToggle.addEventListener("click", () => {
        video.muted = !video.muted;
        soundIcon.classList.toggle("fa-volume-up", !video.muted);
        soundIcon.classList.toggle("fa-volume-mute", video.muted);
    });

    const titles = ["@", "@x", "@x3", "@x3z", "@x3zn", "@x3zny", "@x3zn", "@x3z", "@x3", "@x"];
    let titleIndex = 0;
    setInterval(() => {
        document.title = titles[titleIndex];
        titleIndex = (titleIndex + 1) % titles.length;
    }, 500);

    const buttons = document.querySelectorAll(".glow-btn-inner");
    const socialBtns = document.querySelectorAll(".social-btn-inner");
    const overlayText = document.querySelector(".overlay-text");

    function handleMouseMove(e) {
        const { clientX: x, clientY: y } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const rotateY = ((x - centerX) / centerX) * 50;
        const rotateX = ((centerY - y) / centerY) * 50;

        const depth = Math.min(
            Math.hypot(x - centerX, y - centerY) / (Math.max(centerX, centerY) * 0.8),
            1
        );

        buttons.forEach((btn, i) => {
            const extra = (i - (buttons.length - 1) / 2) * 1.5;
            btn.style.transform = `
                rotateX(${rotateX + extra * 0.25}deg)
                rotateY(${rotateY}deg)
                translateZ(${depth * 8 + extra * 2}px)
            `;
        });

        socialBtns.forEach(btn => {
            btn.style.transform = `
                rotateX(${rotateX * 0.6}deg)
                rotateY(${rotateY * 0.6}deg)
                translateZ(${depth * 6}px)
            `;
        });

        if (overlayText && !overlay.classList.contains("hidden")) {
            overlayText.style.transform = `
                rotateX(${rotateX * 0.4}deg)
                rotateY(${rotateY * 0.4}deg)
                translateZ(${depth * 10}px)
            `;
        }
    }

    function resetTransforms() {
        buttons.forEach(btn => {
            btn.style.transform = "rotateX(0) rotateY(0) translateZ(0)";
        });
        socialBtns.forEach(btn => {
            btn.style.transform = "rotateX(0) rotateY(0) translateZ(0)";
        });
        if (overlayText) {
            overlayText.style.transform = "rotateX(0) rotateY(0) translateZ(0)";
        }
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", resetTransforms);
});