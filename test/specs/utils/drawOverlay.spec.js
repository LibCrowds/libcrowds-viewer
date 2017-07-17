import drawOverlay from '@/utils/drawOverlay'

describe('drawOverlay', () => {

  let viewer = null

  beforeEach(() => {
    viewer = {
      addOverlay: function(obj) {}
    }
    spyOn(viewer, 'addOverlay')
  })

  it('adds the overlay', () => {
    drawOverlay(viewer, 1, {}, "cls")
    expect(viewer.addOverlay).toHaveBeenCalled()
  })

  it('draws overlay in the correct location', () => {
    const rect = {x: 1, y: 2, width: 10, height: 10}
    drawOverlay(viewer, 1, rect, "cls")
    expect(viewer.addOverlay).toHaveBeenCalledWith(jasmine.objectContaining({
      location: rect
    }))
  })
})
