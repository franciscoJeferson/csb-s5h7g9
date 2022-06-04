import game from "../../scripts/game.js";
const loadContainer = document.querySelector('.main.game .load')
const audio = document.querySelector('.sound-track')
const root = document.documentElement
const settings = JSON.parse(localStorage.getItem('settings-dificult')) || {
  dificult: {
    name: 'easy',
    namePT: 'fácil',
    timeTransitionDropItem: 3500,
    timeDropItemInitial: 4000,
    timeDropItemEnd: 900,
    timeLoop: 300,
  },
  music: true,
}

root.style.setProperty("--time-transition-drop-item", `${settings.dificult.timeTransitionDropItem}ms`)


game.time = settings.dificult.timeDropItemInitial
game.timeLoop = settings.dificult.timeLoop
game.timeDropItemEnd = settings.dificult.timeDropItemEnd

loadContainer.addEventListener('click', event => {
  const main = document.querySelector('.main.game')
  const sun = document.querySelector('.main.game .sun')
  const moon = document.querySelector('.main.game .moon')
  loadContainer.classList.add('close')
  if (settings.music) {
    audio.play()
    audio.loop = true
  }
  setTimeout(() => {
    game.init()
    sun.classList.add('anim')
    moon.classList.remove('anim')
    setInterval(() => {
      if (main.classList.contains('night')) {
        main.classList.remove('night')
        sun.classList.add('anim')
        moon.classList.remove('anim')
      } else {
        main.classList.add('night')
        sun.classList.remove('anim')
        moon.classList.add('anim')
      }
    }, 30000)
  }, 1000)
})