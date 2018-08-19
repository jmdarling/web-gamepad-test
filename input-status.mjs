import { ps4GamepadMap } from './gamepad-map.mjs'

let gamepad = null
let keysPressedState = {}

let getZeroedBeta = null
let getZeroedGamma = null

let deviceOrientationDebugThrottle = 0

window.addEventListener('gamepadconnected', (gamepadConnectedEvent) => {
  console.log('Gamepad connected')
  gamepad = navigator.getGamepads(gamepadConnectedEvent.gamepad.index)[0]
})

window.addEventListener('keydown', (keyboardEvent) => {
  keysPressedState[keyboardEvent.key] = true
})

window.addEventListener('keyup', (keyboardEvent) => {
  keysPressedState[keyboardEvent.key] = false
})

window.addEventListener('deviceorientation', (deviceOrientationEvent) => {
  if (getZeroedBeta == null) {
    getZeroedBeta = (actualBeta) => Math.round(actualBeta - deviceOrientationEvent.beta)
  }

  if (getZeroedGamma == null) {
    getZeroedGamma = (actualGamma) => Math.round(actualGamma - deviceOrientationEvent.gamma)
  }

  const y = getZeroedBeta(deviceOrientationEvent.beta)
  const x = getZeroedGamma(deviceOrientationEvent.gamma)

  if (deviceOrientationDebugThrottle === 20) {
    console.log('y', y, 'x', x)
    deviceOrientationDebugThrottle = 0
  } else {
    deviceOrientationDebugThrottle++
  }

  keysPressedState.d = false
  keysPressedState.w = false
  keysPressedState.a = false
  keysPressedState.s = false

  if (y > 10) {
    keysPressedState.s = true
  }

  if (y < -10) {
    keysPressedState.w = true
  }

  if (x > 10) {
    keysPressedState.d = true
  }

  if (x < -10) {
    keysPressedState.a = true
  }
})

export default function getInputStatus () {
  const inputStatus = {
    upPressed: false,
    downPressed: false,
    leftPressed: false,
    rightPressed: false
  }

  if (isKeyPressed('w') || isGamepadButtonPressed(ps4GamepadMap.dPadUp)) {
    inputStatus.upPressed = true
  }

  if (isKeyPressed('s') || isGamepadButtonPressed(ps4GamepadMap.dPadDown)) {
    inputStatus.downPressed = true
  }

  if (isKeyPressed('a') || isGamepadButtonPressed(ps4GamepadMap.dPadLeft)) {
    inputStatus.leftPressed = true
  }

  if (isKeyPressed('d') || isGamepadButtonPressed(ps4GamepadMap.dPadRight)) {
    inputStatus.rightPressed = true
  }

  return inputStatus
}

function isKeyPressed (key) {
  if (keysPressedState[key] == null) {
    return false
  }

  return keysPressedState[key]
}

function isGamepadButtonPressed (buttonId) {
  return gamepad != null && gamepad.buttons != null && gamepad.buttons[buttonId].pressed
}
