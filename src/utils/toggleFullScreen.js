/**
 * Enter fullscreen mode.
 * @param {Object} el
 */
function enterFullscreen (el) {
  if (el.requestFullscreen) {
    el.requestFullscreen()
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen()
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen()
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen()
  }
}

/**
 * Exit fullscreen mode.
 * @param {Object} el
 */
function exitFullscreen (el) {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

/**
 * Toggle fullscreen mode.
 * @param {Object} el
 *   The element to put in fullscreen mode.
 */
export default function (el) {
  const isFullScreen = (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement
  )
  if (isFullScreen) {
    exitFullscreen(el)
    return
  }
  enterFullscreen(el)
}
