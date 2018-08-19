// TODO: I know this is incredibly slow.... It desperately needs to be fixed.

export function calculateCollisionMatrix (xPosition, yPosition, width, height) {
  const matrix = []

  for (let x = xPosition; x <= width; x++) {
    matrix[x] = []
    for (let y = yPosition; y <= height; y++) {
      matrix[x][y] = 0
    }
  }

  return matrix
}

export function doesCollide (matrix1, matrix2) {
}
