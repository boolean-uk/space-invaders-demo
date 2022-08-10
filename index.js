// define the state and behaviour needed.
const state = {
  numCells: (600 / 40) * (600 / 40),
  cells: [],
  shipPosition: 217,
  alienPositions: [
    3, 4, 5, 6, 7, 8, 9, 10,11,
    18,19,20,21,22,23,24,25,26,
    33,34,35,36,37,38,39,40,41,
    48,49,50,51,52,53,54,55,56
  ]
}

const setupGame = (element) => {
  state.element = element
  // draw the grid
  drawGrid()
  // draw the spaceship
  drawShip()
  // draw the aliens
  drawAliens()
  // draw the scoreboard
}

const drawGrid = () => {
  // create container div
  const grid = document.createElement('div')
  grid.classList.add('grid')
  // insert grid into the app
  state.element.append(grid)
  // loop through a certain number to generate cells.
  for (let i=0; i<state.numCells; i++) {
    const cell = document.createElement('div')
    state.cells.push(cell)
    // insert cell into grid
    grid.append(cell)
  }
}

const drawShip = () => {
  // find starting point
  // add class to cell to add background image.
  state.cells[state.shipPosition].classList.add('spaceship')
}

const controlShip = (event) => {
  // demonstrate
  // console.log(event)
  if (event.code === 'ArrowLeft') {
    moveShip('left')
  } else if (event.code === 'ArrowRight') {
    moveShip('right')
  } else if (event.code === 'Space') {
    fire()
  }
}

const moveShip = (direction) => {
  // remove class, update position, add class.
  // grid boundaries using modulo (left side multiples of 15, right side (15 minus 1))
  state.cells[state.shipPosition].classList.remove('spaceship')
  if (direction === 'left' && state.shipPosition % 15 !== 0) {
    state.shipPosition--
  } else if (direction === 'right' && state.shipPosition % 15 !== 14) {
    state.shipPosition++
  }
  state.cells[state.shipPosition].classList.add('spaceship')
}

const fire = () => {
  // using an interval add and remove bg image for a laser increasing up the grid
  // clear interval when laser reaches the top.
  // laser starts at ship position
  let interval
  let laserPosition = state.shipPosition

  interval = setInterval(() => {
    // first remove laser image from cell
    state.cells[laserPosition].classList.remove('laser')
    // then move up the grid
    laserPosition-=15
    // before we do anything, check we're still in the grid.
    if (laserPosition < 0) {
      clearInterval(interval)
      return
    }

    // if there's an alien, BOOM!
    // clear interval, remove alien image, remove alien from positions, set a timeout for a boom emoji
    if (state.alienPositions.includes(laserPosition)) {
      clearInterval(interval)
      state.alienPositions.splice(state.alienPositions.indexOf(laserPosition), 1)
      state.cells[laserPosition].classList.remove('alien')
      state.cells[laserPosition].classList.add('hit')
      setTimeout(() => {
        state.cells[laserPosition].classList.remove('hit')
      }, 200)
      return
    }

    // add image
    state.cells[laserPosition].classList.add('laser')
  }, 100)
}

const drawAliens = () => {
  // loop through alien positions, add class name to corresponding cell.
  state.alienPositions.forEach(position => state.cells[position].classList.add('alien'))
}

const play = () => {
  // start the ability to move and fire
  window.addEventListener('keydown', controlShip)
  // start the aliens moving!
}


// query the page for the element
const appElement = document.querySelector('.app')
// insert app into the game
setupGame(appElement)
// play!
play()
