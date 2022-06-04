const inputRadioDificult = document.querySelectorAll('input[name="dificult"]')
const dificultController = document.querySelector('.dificult-controller')
const musicController = document.querySelector('.music .music-controller')
const dificultItemsP = document.querySelector('.dificult-controller .dificult')
const overlay = document.querySelector('.overlay')
const backButton = document.querySelector('.back-button')
const clickOverlay = document.querySelector('.click-overlay')

overlay.addEventListener('click', event => {
  const ref = document.querySelector(`.${event.target.dataset.ref}`)
  overlay.classList.remove('show')
  ref.classList.remove('show')
})
backButton.addEventListener('click', event => {
  window.history.back()
})
clickOverlay.addEventListener('click', event => overlay.click())

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

dificultItemsP.textContent = settings.dificult.namePT
musicController.checked = settings.music
dificultController.addEventListener('click', event => {
  const ref = document.querySelector(`.${event.target.dataset.ref}`)
  overlay.classList.add('show')
  overlay.setAttribute('data-ref', event.target.dataset.ref)
  ref.classList.add('show')
})
musicController.addEventListener('change', event => {
  settings.music = !settings.music
  localStorage.setItem('settings-dificult', JSON.stringify(settings))
})
inputRadioDificult.forEach(item => {
  if(item.getAttribute('id') === settings.dificult.name) {
    item.checked = true
  } else {
    item.checked = false
  }
  item.addEventListener('change', event => {
    const dificultInput = event.target.getAttribute('id')
    if(dificultInput === 'easy') {
      settings.dificult = {
        name: 'easy',
        namePT: 'fácil',
        timeTransitionDropItem: 3500,
        timeDropItemInitial: 4000,
        timeDropItemEnd: 900,
        timeLoop: 300,
      }
    } else if(dificultInput === 'normal') {
      settings.dificult = {
        name: 'normal',
        namePT: 'normal',
        timeTransitionDropItem: 3500,
        timeDropItemInitial: 4000,
        timeDropItemEnd: 800,
        timeLoop: 500, 
      }
    } else if(dificultInput === 'hard') {
      settings.dificult = {
        name: 'hard',
        namePT: 'difícil',
        timeTransitionDropItem: 3500,
        timeDropItemInitial: 4000,
        timeDropItemEnd: 500,
        timeLoop: 700,
      }
    } else if(dificultInput === 'impossible') {
      settings.dificult = {
        name: 'impossible',
        namePT: 'impossível',
        timeTransitionDropItem: 3500,
        timeDropItemInitial: 3800,
        timeDropItemEnd: 300,
        timeLoop: 500, 
      }
    }
    dificultItemsP.textContent = settings.dificult.namePT
    localStorage.setItem('settings-dificult', JSON.stringify(settings))
  })
})