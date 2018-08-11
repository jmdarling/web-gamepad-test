const canvas = document.getElementById('canvas')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

const renderer = canvas.getContext('2d')

window.addEventListener('resize', () => {
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
})

export function clearCanvas () {
  renderer.clearRect(0, 0, canvas.width, canvas.height)
}

export function getHeight () {
  return canvas.height
}

export function getWidth () {
  return canvas.width
}

export function getRenderer () {
  return renderer
}
