/**
 * Download the current canvas.
 * @param {Object} viewer
 *   The viewer.
 */
export default function (viewer) {
  const filename = 'download.png'
  const canvas = viewer.drawer.canvas
  const data = canvas.toDataURL()
  const link = document.createElement('a')
  link.setAttribute('type', 'hidden')
  link.download = filename
  link.href = data
  document.body.appendChild(link)

  if (navigator.msSaveBlob) { // IE
    navigator.msSaveBlob(canvas.msToBlob(), filename)
  } else {
    link.click()
  }
}
