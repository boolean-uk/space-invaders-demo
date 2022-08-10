// define the state and behaviour needed.
const state = {
  numCells: (600 / 40) * (600 / 40),
  cells: [],
  shipPosition: 217
}

const setupGame = (element) => {
  state.element = element
  // draw the grid
  drawGrid()
  // draw the spaceship
  drawShip()
  // draw the aliens
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
