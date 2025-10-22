document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const video = document.getElementById("background-video");
  const videoSource = document.getElementById("video-source");
  const soundToggle = document.getElementById("sound-toggle");
  const soundIcon = document.getElementById("sound-icon");

  // === LISTA VIDEO ===
  const videos = [
    "video/sound1.mp4",
    "video/sound2.mp4",
    "video/sound3.mp4",
    "video/sound5.mp4",
    "video/sound6.mp4",
  ];

  function getRandomVideo(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  // === CLICK TO ENTER ===
  overlay.addEventListener("click", () => {
    const randomSrc = getRandomVideo(videos);
    videoSource.src = randomSrc;
    video.muted = false; // od razu z dzwiekim
    video.load();
    video.play();

    overlay.classList.add("hidden");
  });

  // === SOUND TOGGLE ===
  soundToggle.addEventListener("click", () => {
    video.muted = !video.muted;

    if (video.muted) {
      soundIcon.classList.remove("fa-volume-up");
      soundIcon.classList.add("fa-volume-mute");
    } else {
      soundIcon.classList.remove("fa-volume-mute");
      soundIcon.classList.add("fa-volume-up");
    }
  });

  // anim do nazwy
  const titles = [
    "@",
    "@x",
    "@x3",
    "@x3z",
    "@x3zn",
    "@x3zny",
    "@x3zn",
    "@x3z",
    "@x3",
    "@x",
  ];
  let titleIndex = 0;

  function changeTitle() {
    document.title = titles[titleIndex];
    titleIndex = (titleIndex + 1) % titles.length;
  }

  setInterval(changeTitle, 500);
});
