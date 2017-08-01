import fixtures from '../../fixtures.js'

describe('Annotation', () => {
  let anno = null
  let opts = null
  let itemOne = null
  let updatedItemOne = null
  let itemTwo = null
  let itemThree = null

  beforeEach(() => {
    itemOne = fixtures.buildItem(1)
    updatedItemOne = fixtures.buildItem(1)
    itemTwo = fixtures.buildItem(2)
    itemThree = fixtures.buildItem(3)
    anno = fixtures.buildAnnotation()
  })

  describe('_setMultiItem', () => {
    it('adds multi-item when none exists', () => {
      const original = anno.key
      anno._setMultiItem(anno, 'key', itemOne)
      expect(original).toBe(undefined)
      expect(anno.key).toBe(itemOne)
    })

    it('only adds the same multi-item once', () => {
      anno._setMultiItem(anno, 'key', itemOne)
      anno._setMultiItem(anno, 'key', itemOne)
      expect(anno.key).toBe(itemOne)
    })

    it('updates the same multi-item', () => {
      anno._setMultiItem(anno, 'key', itemOne)
      anno._setMultiItem(anno, 'key', updatedItemOne)
      expect(anno.key).toBe(updatedItemOne)
    })

    it('creates an array with the second multi-item', () => {
      anno._setMultiItem(anno, 'key', itemOne)
      anno._setMultiItem(anno, 'key', itemTwo)
      expect(Array.isArray(anno.key)).toBeTruthy()
      expect(anno.key.length).toBe(2)
      expect(anno.key[0]).toBe(itemOne)
      expect(anno.key[1]).toBe(itemTwo)
    })

    it('adds further multi-items to existing array', () => {
      anno.key = [itemOne, itemTwo]
      anno._setMultiItem(anno, 'key', itemThree)
      expect(anno.key.length).toBe(3)
      expect(anno.key[0]).toBe(itemOne)
      expect(anno.key[1]).toBe(itemTwo)
      expect(anno.key[2]).toBe(itemThree)
    })

    it('updates multi-items in existing array', () => {
      anno.key = [itemOne, itemTwo]
      anno._setMultiItem(anno, 'key', updatedItemOne)
      expect(anno.key.length).toBe(2)
      expect(anno.key[0]).toBe(updatedItemOne)
      expect(anno.key[1]).toBe(itemTwo)
    })
  })

  describe('addComment', () => {
    it('adds a comment', () => {
      const value = 'hello'
      anno.addComment(value)
      expect(anno.body).toEqual({
        type: 'TextualBody',
        value: value,
        purpose: 'commenting',
        format: 'text/plain'
      })
    })
  })

  describe('addClassification', () => {
    it('adds a classification', () => {
      const value = 'hello'
      anno.addClassification(value)
      expect(anno.body).toEqual({
        type: 'SpecificResource',
        purpose: 'classifying',
        value: value
      })
    })

  })

  describe('addDescription', () => {
    it('adds a description', () => {
      const value = 'hello'
      anno.addDescription(value)
      expect(anno.body).toEqual({
        type: 'TextualBody',
        purpose: 'describing',
        value: value,
        format: 'text/plain'
      })
    })
  })
})
