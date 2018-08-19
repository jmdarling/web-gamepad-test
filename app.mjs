import Background from './background.mjs'
import { clearCanvas, getHeight, getWidth, getRenderer } from './canvas.mjs'
import { calculateCollisionMatrix } from './collision-utilities.mjs'
import getInputStatus from './input-status.mjs'

const renderer = getRenderer()

const velocity = 30

class Rectangle {
  constructor (renderer, width = 100, height = 100, fill = 'black') {
    this.clearPositionX = 0
    this.positionX = 0
    this.clearPositionY = 0
    this.positionY = 0
    this.width = width
    this.height = height

    this.renderer = renderer
    this.fill = fill
  }

  draw () {
    this.renderer.beginPath()
    this.renderer.fillStyle = this.fill
    this.renderer.fillRect(this.positionX, this.positionY, this.width, this.height)
    this.renderer.closePath()
  }

  queueMoveUp (amount) {
    if (this.positionY - amount < 0) {
      return
    }

    this.clearPositionY = this.positionY
    this.positionY -= amount
  }

  queueMoveDown (amount) {
    if (this.positionY + this.height + amount > getHeight()) {
      return
    }

    this.clearPositionY = this.positionY
    this.positionY += amount
  }

  queueMoveLeft (amount) {
    if (this.positionX - amount < 0) {
      return
    }

    this.clearPositionX = this.positionX
    this.positionX -= amount
  }

  queueMoveRight (amount) {
    if (this.positionX + this.width + amount > getWidth()) {
      return
    }

    this.clearPositionX = this.positionX
    this.positionX += amount
  }
}

const rectangle = new Rectangle(renderer)

rectangle.draw()

function step () {
  window.requestAnimationFrame(step)

  const inputStatus = getInputStatus()

  let shouldDraw = false

  if (inputStatus.upPressed) {
    rectangle.queueMoveUp(velocity)
    shouldDraw = true
  }

  if (inputStatus.downPressed) {
    rectangle.queueMoveDown(velocity)
    shouldDraw = true
  }

  if (inputStatus.leftPressed) {
    rectangle.queueMoveLeft(velocity)
    shouldDraw = true
  }

  if (inputStatus.rightPressed) {
    rectangle.queueMoveRight(velocity)
    shouldDraw = true
  }

  if (shouldDraw) {
    clearCanvas()
    // const background = new Background(renderer, getWidth(), getHeight())
    // console.log(background.getCollisionMatrix())
    // background.draw()
    rectangle.draw()
  }
}

window.requestAnimationFrame(step)
