import Board from './board.js'

class Snake {
  static directions = {
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP: 'UP'
  }

  static speed = Math.floor(1000 / 4)

  #changingDirection = false
  #context = null
  #direction = Snake.directions.DOWN
  #updatedAt = new Date().getTime()

  path = []

  constructor (context) {
    this.#context = context
  }

  _move () {
    if (new Date().getTime() < this.#updatedAt + Snake.speed) {
      return
    }

    const { food } = this.#context

    for (const piece of this.path) {
      if (piece.x === food.path.x && piece.y === food.path.y) {
        this.path.push({ ...this.path[this.path.length - 1] })
        food.restart()

        break
      }
    }

    for (let i = this.path.length - 1; i > 0; i--) {
      this.path[i].x = this.path[i - 1].x
      this.path[i].y = this.path[i - 1].y
    }

    switch (this.#direction) {
      case Snake.directions.DOWN: {
        if (this.path[0].y === Board.rowTilesCount - 1) {
          this.path[0].y = 0
        } else {
          this.path[0].y += 1
        }

        break
      }
      case Snake.directions.LEFT: {
        if (this.path[0].x === 0) {
          this.path[0].x = Board.rowTilesCount - 1
        } else {
          this.path[0].x -= 1
        }

        break
      }
      case Snake.directions.RIGHT: {
        if (this.path[0].x === Board.rowTilesCount - 1) {
          this.path[0].x = 0
        } else {
          this.path[0].x += 1
        }

        break
      }
      case Snake.directions.UP: {
        if (this.path[0].y === 0) {
          this.path[0].y = Board.rowTilesCount - 1
        } else {
          this.path[0].y -= 1
        }

        break
      }
    }

    this.#changingDirection = false
    this.#updatedAt += Snake.speed
  }

  draw () {
    const { board, ctx } = this.#context

    for (const piece of this.path) {
      ctx.beginPath()

      ctx.rect(
        piece.x * board.tileLength + board.offset.left,
        piece.y * board.tileLength + board.offset.top,
        board.tileLength,
        board.tileLength
      )

      ctx.fillStyle = 'blue'
      ctx.fill()
    }

    this._move()
  }

  register () {
    const changeDirection = (direction) => {
      const oppositeDirection = direction === Snake.directions.DOWN
        ? Snake.directions.UP
        : direction === Snake.directions.LEFT
          ? Snake.directions.RIGHT
          : direction === Snake.directions.RIGHT
            ? Snake.directions.LEFT
            : Snake.directions.DOWN

      if (
        this.#direction !== direction &&
        this.#direction !== oppositeDirection &&
        this.#changingDirection === false
      ) {
        this.#changingDirection = true
        this.#direction = direction
      }
    }

    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowDown':
        case 'KeyS': {
          changeDirection(Snake.directions.DOWN)
          break
        }
        case 'ArrowLeft':
        case 'KeyA': {
          changeDirection(Snake.directions.LEFT)
          break
        }
        case 'ArrowRight':
        case 'KeyD': {
          changeDirection(Snake.directions.RIGHT)
          break
        }
        case 'ArrowUp':
        case 'KeyW': {
          changeDirection(Snake.directions.UP)
          break
        }
      }
    })

    let clientX = null
    let clientY = null

    function handleTouchStart (e) {
      const firstTouch = (e.touches || e.originalEvent.touches)[0]

      clientX = firstTouch.clientX
      clientY = firstTouch.clientY
    }

    function handleTouchMove (e) {
      if (!clientX || !clientY) {
        return
      }

      e.preventDefault()

      const xDiff = clientX - e.touches[0].clientX
      const yDiff = clientY - e.touches[0].clientY

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          changeDirection(Snake.directions.LEFT)
        } else {
          changeDirection(Snake.directions.RIGHT)
        }
      } else {
        if (yDiff > 0) {
          changeDirection(Snake.directions.UP)
        } else {
          changeDirection(Snake.directions.DOWN)
        }
      }

      clientX = null
      clientY = null
    }

    document.body.addEventListener('touchstart', handleTouchStart)
    document.body.addEventListener('touchmove', handleTouchMove)
  }

  start () {
    const percent = 70
    const min = Math.floor((100 - percent) / 200 * Board.rowTilesCount)
    const max = min + Math.floor(Board.rowTilesCount * percent / 100)

    this.path.push({
      x: Math.floor(Math.random() * (max - min)) + min,
      y: Math.floor(Math.random() * (max - min)) + min
    })

    this.path.push({
      x: this.path[0].x,
      y: this.path[0].y - 1
    })
  }

  update () {
  }
}

export default Snake
