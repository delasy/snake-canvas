import Background from './background.js'
import Board from './board.js'
import Food from './food.js'
import Snake from './snake.js'

class Context {
  background = new Background(this)
  board = new Board(this)
  canvas = document.createElement('canvas')
  ctx = this.canvas.getContext('2d')
  food = new Food(this)
  game = null
  snake = new Snake(this)

  constructor (game) {
    this.game = game

    this.canvas.style.display = 'block'
    document.body.insertBefore(this.canvas, document.body.children[0])
  }

  draw () {
    this.background.draw()
    this.board.draw()
    this.food.draw()
    this.snake.draw()

    window.requestAnimationFrame(() => {
      this.draw()
    })
  }

  register () {
    this.background.register()
    this.board.register()
    this.food.register()
    this.snake.register()
  }

  start () {
    this.background.start()
    this.board.start()
    this.snake.start()
    this.food.start()

    this.update()
  }

  update () {
    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth

    this.background.update()
    this.board.update()
    this.food.update()
    this.snake.update()
  }
}

export default Context
