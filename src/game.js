import Context from './context.js'

class Game {
  context = new Context(this)

  start () {
    this.context.start()
    this.context.register()
    this.context.draw()

    window.addEventListener('resize', () => {
      this.context.update()
    })
  }
}

export default Game
