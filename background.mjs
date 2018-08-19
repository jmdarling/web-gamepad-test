import { calculateCollisionMatrix } from './collision-utilities.mjs'

export default class Background {
  constructor (renderer, canvasWidth, canvasHeight) {
    this.renderer = renderer
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
  }

  draw () {
    this.renderer.beginPath()
    this.renderer.fillStyle = 'gray'
    this.renderer.fillRect(0, this.canvasHeight * 0.65, this.canvasWidth, this.canvasHeight * 0.05)
    this.renderer.closePath()
    this.getCollisionMatrix()
  }

  getCollisionMatrix () {
    return calculateCollisionMatrix(0, this.canvasHeight * 0.65, this.canvasWidth, this.canvasHeight * 0.05)
  }
}
