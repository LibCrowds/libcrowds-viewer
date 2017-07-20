import OpenSeadragon from 'openseadragon'

/**
 * Represents an selector for tracking area selection.
 * @param {Object} viewer
 *   An OpenSeadragon viewer.
 */
class Selector {
  constructor (viewer) {
    this.viewer = viewer
    this.x1 = 0
    this.y1 = 0
    this.x2 = 0
    this.y2 = 0
    this.enabled = false
    this.selecting = false
    this.rect = {}

    console.log('selector initialised', this.viewer)

    this.viewer.addHandler('canvas-drag-end', (obj) => {
      if (this.enabled) {
        this.selecting = false
        console.log('canvas dragged')
        this.$emit('selection', this.rect, this.selecting)
      }
    })

    this.viewer.addHandler('canvas-drag', (obj) => {
      if (this.enabled) {
        if (!this.selecting) {
          // Set starting coordinates
          this.x1 = obj.position.x
          this.y1 = obj.position.y
          this.selecting = true
          return
        }
        // Calcuate coordinates while dragging
        this.x2 = obj.position.x
        this.y2 = obj.position.y
        this.calculate()
        console.log('selecting')
        this.$emit('selection', this.rect, this.selecting)
      }
    })
  }

  calculate () {
    // Calculte the rest of the pixel coordinates
    const x3 = Math.min(this.x1, this.x2)
    const x4 = Math.max(this.x1, this.x2)
    const y3 = Math.min(this.y1, this.y2)
    const y4 = Math.max(this.y1, this.y2)

    // Get the window coordinates
    const windowTopLeft = new OpenSeadragon.Point(x3, y3)
    const windowBottomRight = new OpenSeadragon.Point(x4 - x3, y4 - y3)

    // Get viewport coordinates
    const vp = this.viewer.viewport
    const vpTopLeft = vp.windowToViewportCoordinates(windowTopLeft)
    const vpBottomRight = vp.windowToViewportCoordinates(windowBottomRight)

    // Create a new viewport rect
    this.rect = new OpenSeadragon.Rect(
      vpTopLeft.x,
      vpTopLeft.y,
      vpTopLeft.x - vpBottomRight.x,
      vpTopLeft.y - vpBottomRight.y
    )
  }

  /**
   * Enable the selector.
   */
  enable () {
    this.enabled = true
  }

  /**
   * Disable the selector.
   */
  disable () {
    this.enabled = false
  }
}

export default Selector
