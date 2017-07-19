import Annotation from '@/model/Annotation'

describe('Annotation', () => {
  let anno = null
  let opts = null
  let itemOne = null
  let updatedItemOne = null
  let itemTwo = null
  let itemThree = null

  beforeEach(() => {
    itemOne = {
      id: 'http://example.com/item1',
      name: 'something'
    }
    updatedItemOne = {
      name: 'somethingupdated',
      id: 'http://example.com/item1'
    }
    itemTwo = {
      name: 'somethingelse',
      id: 'http://example.com/item2'
    }
    itemThree = {
      name: 'stillsomethingelse',
      id: 'http://example.com/item3'
    }
    opts = {
      imgInfo: {
        id: 'http://example.com/img',
        context: 'http://example.com/context',
        height: 100,
        width: 100
      },
      motivation: 'testing'
    }
    anno = new Annotation(opts)
  })

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
    expect(anno.key).toBe([itemOne, itemTwo, itemThree])
  })

  // it('update multi-items in existing array', () => {
  //   anno.key = [itemOne, itemTwo]
  //   anno._setMultiItem(anno, 'key', updatedItemOne)
  //   expect(anno.key).toBe([updatedItemOne, itemTwo])
  // })
})
