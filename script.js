const images = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg"
];
let currentIndex = 0;
const image = document.getElementById("slide-image");
const counter = document.getElementById("counter");
const dotsContainer = document.getElementById("dots");
const slider = document.querySelector(".slider");

function updateSlider() {
  image.src = images[currentIndex];
  counter.textContent = `Изображение ${currentIndex + 1} из ${images.length}`;
  refreshDots();
}
function next() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlider();
}
function prev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider();
}
function goTo(i) {
  currentIndex = i;
  updateSlider();
}
function refreshDots() {
  document.querySelectorAll(".dot").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex);
  });
}
function buildDots() {
  dotsContainer.innerHTML = "";
  images.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Перейти к слайду ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });
}

document.getElementById("prev").addEventListener("click", prev);
document.getElementById("next").addEventListener("click", next);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
});

let startX = 0;
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });
slider.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - startX;
  if (dx > 30) prev();
  else if (dx < -30) next();
});

buildDots();
updateSlider();