class Board {
  static tilesCount = 20 * 20
  static rowTilesCount = Math.sqrt(Board.tilesCount)

  #context = null

  offset = { left: 0, top: 0 }
  rowTilesLength = null
  tileLength = null

  constructor (context) {
    this.#context = context
  }

  draw () {
    const { ctx } = this.#context

    ctx.beginPath()

    ctx.rect(
      this.offset.left,
      this.offset.top,
      this.rowTilesLength,
      this.rowTilesLength
    )

    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray'
    ctx.stroke()
  }

  register () {
  }

  start () {
  }

  update () {
    const { canvas } = this.#context
    const length = canvas.width > canvas.height ? canvas.height : canvas.width

    this.tileLength = Math.floor(length / Board.rowTilesCount)
    this.rowTilesLength = this.tileLength * Board.rowTilesCount
    this.offset.left = (canvas.width - this.rowTilesLength - 2) / 2
    this.offset.top = (canvas.height - this.rowTilesLength - 2) / 2
  }
}

export default Board
