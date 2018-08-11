import getInputStatus from './input-status.mjs'

const canvas = document.getElementById('canvas')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

const renderer = canvas.getContext('2d')

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

  clear () {
    // this.renderer.clearRect(this.clearPositionX, this.clearPositionY, this.width, this.height)
    this.renderer.clearRect(0, 0, canvas.width, canvas.height)
  }

  draw () {
    this.clear()

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
    if (this.positionY + this.height + amount > canvas.height) {
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
    if (this.positionX + this.width + amount > canvas.width) {
      return
    }

    this.clearPositionX = this.positionX
    this.positionX += amount
  }
}

const rectangle = new Rectangle(renderer)

rectangle.draw()

window.addEventListener('resize', () => {
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
})

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
    rectangle.draw()
  }
}

window.requestAnimationFrame(step)
