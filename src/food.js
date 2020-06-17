import Board from './board.js'

class Food {
  #context = null

  path = { x: 0, y: 0 }

  constructor (context) {
    this.#context = context
  }

  draw () {
    const { board, ctx } = this.#context
    const radius = board.tileLength / 2

    ctx.beginPath()

    ctx.arc(
      this.path.x * board.tileLength + board.offset.left + radius,
      this.path.y * board.tileLength + board.offset.top + radius,
      radius,
      0,
      2 * Math.PI,
      false
    )

    ctx.fillStyle = 'green'
    ctx.fill()
  }

  register () {
  }

  restart () {
    this.start()
  }

  start () {
    const { snake } = this.#context
    const possiblePathes = []

    for (let i = 0; i < Board.rowTilesCount; i++) {
      for (let j = 0; j < Board.rowTilesCount; j++) {
        possiblePathes.push({
          x: j,
          y: i
        })
      }
    }

    for (const piece of snake.path) {
      for (const possiblePath of possiblePathes) {
        if (piece.x === possiblePath.x && piece.y === possiblePath.y) {
          break
        }
      }
    }

    const pieceIdx = Math.floor(Math.random() * possiblePathes.length)
    this.path = possiblePathes[pieceIdx]
  }

  update () {
  }
}

export default Food
