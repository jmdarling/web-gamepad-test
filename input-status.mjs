import { ps4GamepadMap } from './gamepad-map.mjs'

let gamepad = null
let keysPressedState = {}

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
