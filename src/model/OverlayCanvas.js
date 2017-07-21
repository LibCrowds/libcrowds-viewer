import paper from 'paper'

class OverlayCanvas {
  constructor (viewer) {
    this.task = null
    this.viewer = viewer

    this.canvas = document.createElement('canvas')
    this.canvas.id = 'overlay-canvas'
    this.canvas.style.position = 'absolute'
    this.canvas.style.left = 0
    this.canvas.style.top = 0
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.viewer.canvas.appendChild(this.canvas)

    this.paperScope = new paper.PaperScope()
    console.log(this.viewer.canvas)
    this.paperScope.setup('overlay-canvas')
    this.paperScope.activate()

    window.addEventListener('resize', () => this.resize)

    this.resize()
  }

  setupMouseTool () {
    this.mouseTool = new this.paperScope.Tool()
    this.mouseTool.overlay = this
    this.mouseTool.onMouseUp = this.onMouseUp
    this.mouseTool.onMouseDrag = this.onMouseDrag
    this.mouseTool.onMouseMove = this.onMouseMove
    this.mouseTool.onMouseDown = this.onMouseDown
    this.mouseTool.onDoubleClick = this.onDoubleClick
    this.mouseTool.onKeyDown = function (event) {}
  }

  /**
   * Create a rectangle in the paper scope from a viewport rectangle.
   * @param {Object} rect
   *   An OpenSeadragon viewport rectangle.
   */
  viewportToPaperRectangle (rect) {
    const vp = this.viewer.viewport
    const elRect = vp.viewportToViewerElementRectangle(rect)
    console.log(vp.viewportToImageRectangle(vp.viewerElementToViewportRectangle(elRect)))
    const path = new this.paperScope.Path.Rectangle(elRect)
    path.fillColor = 'rgba(0, 255, 6, 0.2)'
  }

  /**
   *
   */
  resize () {
    console.log(this.viewer)
    const vp = this.viewer.viewport
    let center = vp.viewportToWindowCoordinates(vp.getCenter(true))
    this.paperScope.view.center = new paper.Point(center.x, center.y)
  }

  /**
   * Draw all overlays.
   * @param {String} id
   *   An ID.
   * @param {Object} rect
   *   The rect to draw.
   */
  draw () {
    for (let overlay of this.task.overlays) {
      this.viewportToPaperRectangle(overlay.rect)
    }
    this.paperScope.view.draw()
  }

  /**
   * Load a task.
   */
  loadTask (task) {
    this.task = task
    this.draw()
  }
}

export default OverlayCanvas
