export default {
  time: 7000,
  timeLoop: 200,
  timeDropItemEnd: 1000,
  score: 0,
  interval: '',
  missed: 0,
  dropPosition: [
    '5%', '10%',
    '15%', '20%',
    '25%', '30%',
    '30%', '35%',
    '40%', '45%',
    '50%', '55%',
    '60%', '65%',
    '70%', '75%',
    '80%', '85%',
  ],
  trashs: {
    eletronic: [
      'battery',
      'energy_cable',
      'headset',
      'small_battery',
      'smartphone',
    ],
    glass: [
      'glass_bottle',
      'glass_cup',
      'glass_jar',
      'hourglass',
      'magnifying_glass',
    ],
    metal: ['copper', 'iron', 'metal_tin', 'nut', 'screw',],
    organic: ['apple', 'banana', 'lasagna', 'pear', 'potatoe',],
    paper: ['book', 'cardboard', 'magazine', 'napkin', 'newspaper',],
    plastic: ['plastic_bag', 'plastic_bottle', 'plastic_cup', 'plastic_dish', 'plastic_spoon',],
  },
  init: function () {
    const score = document.querySelector(
      '.main .game-header .score-container .score span'
    )
    const missed = document.querySelector(
      '.main .game-header .missed-container .missed span'
    )
    const mainContainer = document.querySelector('.main')
    const audio = document.querySelector('.sound-track')
    const currentTrash = JSON.parse(localStorage.getItem('trash'))
    const allGarbages = [
      ...this.trashs.paper,
      ...this.trashs.plastic,
      ...this.trashs.glass,
      ...this.trashs.metal,
      ...this.trashs.organic,
      ...this.trashs.eletronic
    ]
    const dropItems = () => {
      if (currentTrash !== '') {
        clearInterval(this.interval)
        const indexArray = allGarbages.length - 1
        const arrayPosition = Math.round(Math.random() * indexArray)
        const screenWidthPosition = Math.round(Math.random() * 17)
        const div = document.createElement('div')
        div.classList.add('item')
        div.setAttribute('data-garbage', allGarbages[arrayPosition])
        mainContainer.appendChild(div)
        div.addEventListener('animationend', (event) => {
          if (currentTrash.includes(event.target.dataset.garbage)) {
            if (this.score > 0) {
              this.score = this.score - 1
            }
            if(this.missed < 8) {
              this.missed++
            }
          }
          score.textContent = this.score
          missed.textContent = this.missed
          mainContainer.removeChild(event.target)
        })
        div.addEventListener("pointerdown", (event) => {
          event.stopPropagation();
          if (currentTrash.includes(event.target.dataset.garbage)) {
            this.score = this.score + 2;
          } else {
            if (this.score > 0) {
              this.score = this.score - 1;
            }
            if(this.missed < 8) {
              this.missed++
            }
          }
          score.textContent = this.score;
          missed.textContent = this.missed
          mainContainer.removeChild(event.target);
        });
        div.style.left = this.dropPosition[screenWidthPosition]
        if (this.time > this.timeDropItemEnd) {
          this.time = this.time - this.timeLoop
        }
        if (this.missed < 8) {
          this.interval = setInterval(dropItems, this.time)
        } else {
          clearInterval(this.interval)
          audio.pause()
          this.finish()
        } 
      }
    }
    dropItems()
  },
  finish: function () {
    const menuGameFinish = document.querySelector('.main .menu-game-finish')
    const overlay = document.querySelector('.main .overlay')
    const finalScore = document.querySelector(
      '.main .menu-game-finish .final-score .punctuation'
    )
    const playAgain = document.querySelector(
      '.main .menu-game-finish .play-again'
    )
    const changeTrash = document.querySelector(
      '.main .menu-game-finish .change-trash'
    )
    playAgain.addEventListener('click', (event) => {
      menuGameFinish.style.bottom = '-100%'
      overlay.style.display = 'none'
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    })
    changeTrash.addEventListener('click', (event) => {
      window.history.back()
    })
    finalScore.textContent = this.score
    menuGameFinish.style.bottom = '2%'
    overlay.style.display = 'flex'
  }
}
