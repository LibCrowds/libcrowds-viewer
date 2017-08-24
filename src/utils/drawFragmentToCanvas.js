/**
 * Draw a cropped section of the current viewer canvas on the given canvas.
 * @param {Object} srcCanvas
 * The canvas to copy from.
 * @param {String} webRect
 *   The web rectangle (normal pixel coordinates of the page).
 * @param {HTMLCanvasElement} destCanvas
 *   The canvas to draw on.
 */
export default function (srcCanvas, webRect, destCanvas) {
  const srcContext = srcCanvas.getContext('2d')
  const imgData = srcContext.getImageData(
    webRect.x,
    webRect.y,
    webRect.width,
    webRect.height
  )

  // Put image data into a new canvas
  let newCanvas = document.createElement('canvas')
  let newCtx = newCanvas.getContext('2d')
  newCanvas.width = imgData.width
  newCanvas.height = imgData.height
  newCtx.putImageData(imgData, 0, 0)

  // Scale
  let destCtx = destCanvas.getContext('2d')
  let scaleFactor = 1
  if (
    newCanvas.width > newCanvas.height &&
    newCanvas.width > destCanvas.width
  ) {
    scaleFactor = destCanvas.width / newCanvas.width
  } else if (
    newCanvas.height > newCanvas.width &&
    newCanvas.height > destCanvas.height
  ) {
    scaleFactor = destCanvas.height / newCanvas.height
  }
  destCtx.scale(scaleFactor, scaleFactor)

  // Draw
  destCtx.drawImage(
    newCanvas,
    destCanvas.width / scaleFactor / 2 - imgData.width / 2,
    destCanvas.height / scaleFactor / 2 - imgData.height / 2
  )
}
