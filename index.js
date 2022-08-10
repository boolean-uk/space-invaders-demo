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
  if (state.gameover) return

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
  // loop through cells, remove, and add class name to corresponding cell.
  state.cells.forEach((cell, index) => {
    // reset: if cell index is currently an alien position remove it
    if (cell.classList.contains('alien')) {
      cell.classList.remove('alien')
    }
    // update: if cell index is an alien position, add alien class
    if (state.alienPositions.includes(index)) {
      cell.classList.add('alien')
    }
  })
}

const play = () => {
  // start the aliens moving!
  let interval
  // set starting direction
  let direction = 'right'
  // set interval to repeat updating alien positions and drawing them
  interval = setInterval(() => {
    let movement
    // if right
    if (direction === 'right') {
      if (atSide('right')) {
        // go down a row and reverse direction to the left
        movement = 15 - 1
        direction = 'left'
      } else {
        // continue right
        movement = 1
      }
      // if left
    } else if (direction === 'left') {
      if (atSide('left')) {
        // go down a row and reverse direction to the right
        movement = 15 + 1
        direction = 'right'
      } else {
        // continue left
        movement = -1
      }
    }
    //update alien positions
    state.alienPositions = state.alienPositions.map(position => position + movement)
    // redraw aliens
    drawAliens()
    // check game state (and stop the aliens, and stop the ship)
    checkGameState(interval)
  }, 300)
  // start the ability to move and fire
  window.addEventListener('keydown', controlShip)

}

const atSide = (side) => {
  if (side === 'left') {
    // are there any aliens with a position in left hand column? (index multiple of 15)
    return state.alienPositions.some(position => position % 15 === 0)
  } else if (side === 'right') {
    // are there any aliens with a position in right hand column? (index multiple of 15 -1)
    return state.alienPositions.some(position => position % 15 === 14)
  }
}

const checkGameState = (interval) => {
  // if there are no more aliens
  if (state.alienPositions.length === 0) {
    // stop aliens
    clearInterval(interval)
    // set game state
    state.gameover = true
    // show win message
    drawMessage("HUMAN WINS!")

    // if aliens reach bottom row..ish
  } else if (state.alienPositions.some(position => position >= state.shipPosition)){
    // stop aliens
    clearInterval(interval)
    // set game state
    state.gameover = true
    // make ship go boom
    state.cells[state.shipPosition].classList.remove('spaceship')
    state.cells[state.shipPosition].classList.add('hit')
    // show lose message
    drawMessage("GAME OVER!")
  }
}

const drawMessage = (message)  => {
  // add message element with class
  const messageEl = document.createElement('div')
  messageEl.classList.add('message')

  // append h1 with text
  const h1 = document.createElement('h1')
  h1.innerText = message
  messageEl.append(h1)

  // append el to the app
  state.element.append(messageEl)
}

// query the page for the element
const appElement = document.querySelector('.app')
// insert app into the game
setupGame(appElement)
// play!
play()
