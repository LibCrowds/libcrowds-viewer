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
  if (typeof document === 'undefined') {
    return
  }

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
  const scaleFactors = [
    1,
    destCanvas.height / newCanvas.height,
    destCanvas.width / newCanvas.width
  ]
  const sf = Math.min.apply(null, scaleFactors)
  destCtx.scale(sf, sf)

  // Draw
  destCtx.drawImage(
    newCanvas,
    destCanvas.width / sf / 2 - imgData.width / 2,
    destCanvas.height / sf / 2 - imgData.height / 2
  )
}
