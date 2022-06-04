import ripples from "./ripples.js";
const root = document.documentElement;

root.style.setProperty("--height-body", `${window.innerHeight}px`);
window.screen.orientation.addEventListener("change", function () {
  root.style.setProperty("--height-body", `${window.innerHeight}px`);
});

const animateButtons = document.querySelectorAll('.aninmate-buttons')

animateButtons.forEach(item => {
    item.addEventListener("mouseenter", ({ target }) => {
      target.style.boxShadow = " var(--box-shadow-max)";
      target.style.borderRadius = " var(--border-radius-min)";
    })
    item.addEventListener("touchstart", ({ target }) => {
      target.style.boxShadow = " var(--box-shadow-max)";
      target.style.borderRadius = " var(--border-radius-min)";
    })
    item.addEventListener("mouseleave", ({ target }) => {
      target.style.boxShadow = " var(--no-box-shadow-max)";
      target.style.borderRadius = " var(--border-radius-max)";
    })
    item.addEventListener("touchend", ({ target }) => {
      target.style.boxShadow = " var(--no-box-shadow-max)";
      target.style.borderRadius = " var(--border-radius-max)";
    })
    item.addEventListener("click", ({ target }) => {
      target.style.boxShadow = " var(--no-box-shadow-max)";
      target.style.borderRadius = " var(--border-radius-max)";
    })
})

document.body.addEventListener("pointerdown", (event) => {
  ripples.start(event);
});
document.body.addEventListener("mouseup", (event) => {
  ripples.end(event);
});
document.body.addEventListener("touchend", (event) => {
  ripples.end(event);
});