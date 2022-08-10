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

const play = () => {
  // start the aliens moving!
}


// query the page for the element
const appElement = document.querySelector('.app')
// insert app into the game
setupGame(appElement)
// play!
play()
