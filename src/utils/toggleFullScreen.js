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
 * The element to be put in full screen.
 * @param {Boolean} toggle
 */
export default function (el, toggle) {
  if (toggle) {
    enterFullscreen(el)
    return
  }
  exitFullscreen(el)
}
