class Background {
  #context = null

  constructor (context) {
    this.#context = context
  }

  draw () {
    const { canvas, ctx } = this.#context

    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fill()
  }

  register () {
  }

  start () {
  }

  update () {
  }
}

export default Background
