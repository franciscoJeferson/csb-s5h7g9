import game from "./scripts/game.js";

const btnsTrashs = document.querySelectorAll(".btn.trash");

const animateButtons = (target, state) => {
  if (state) {
    target.style.boxShadow = " var(--box-shadow-max)";
    target.style.borderRadius = " var(--border-radius-min)";
  } else {
    target.style.boxShadow = " var(--no-box-shadow-max)";
    target.style.borderRadius = " var(--border-radius-max)";
  }
};
const initGame = (trash) => {
  if (trash === "paper") {
    localStorage.setItem("trash", JSON.stringify(game.trashs.paper));
  } else if (trash === "plastic") {
    localStorage.setItem("trash", JSON.stringify(game.trashs.plastic));
  } else if (trash === "metal") {
    localStorage.setItem("trash", JSON.stringify(game.trashs.metal));
  } else if (trash === "glass") {
    localStorage.setItem("trash", JSON.stringify(game.trashs.glass));
  } else if (trash === "organic") {
    localStorage.setItem("trash", JSON.stringify(game.trashs.organic));
  } else if (trash === "eletronic") {
    localStorage.setItem("trash", JSON.stringify(game.trashs.eletronic));
  }
  window.location.pathname += "/pages/game/index.html";
};

btnsTrashs.forEach((item) => {
  item.addEventListener("mouseenter", ({ target }) =>
    animateButtons(target, true)
  );
  item.addEventListener("touchstart", ({ target }) =>
    animateButtons(target, true)
  );
  item.addEventListener("mouseleave", ({ target }) =>
    animateButtons(target, false)
  );
  item.addEventListener("touchend", ({ target }) =>
    animateButtons(target, false)
  );
  item.addEventListener("click", ({ target }) => {
    animateButtons(target, false);
    initGame(target.dataset.trash);
  });
});
