import getRectFromFragment from '@/utils/getRectFromFragment'
/**
 * Draw a cropped section of the current viewer canvas on the given canvas.
 * @param {Object} viewer
 *   The OpenSeadragon viewer.
 * @param {String} fragment
 *   The media fragment selector value (see https://www.w3.org/TR/media-frags/).
 * @param {HTMLCanvasElement} destCanvas
 *   The canvas to draw on.
 */
export default function (viewer, fragment, destCanvas) {
  // Get image data fragment from current canvas
  const vp = viewer.viewport
  const imgRect = getRectFromFragment(fragment)
  const vpRect = vp.imageToViewportRectangle(imgRect)
  const webRect = vp.viewportToViewerElementRectangle(vpRect)
  const srcCanvas = viewer.drawer.canvas
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
