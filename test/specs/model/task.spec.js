import Task from '@/model/Task'

describe('Annotation', () => {
  let selectTask = null
  let opts = null
  let itemOne = null
  let itemTwo = null

  beforeEach(() => {
    itemOne = {
      id: 'http://example.com/item1',
      name: 'something'
    }
    itemTwo = {
      name: 'somethingelse',
      id: 'http://example.com/item2'
    }
    opts = {
      mode: 'select',
      tag: 'sometag',
      imgInfoUri: 'http://www.example.org/image-service/abcd1234/info.json',
      imgInfo: {}
    }
    selectTask = new Task(opts)
  })

  it('returns an annotation by id', () => {
    selectTask.annotations = [itemOne]
    const anno = selectTask.getAnnotation(itemOne.id)
    expect(anno).toBe(itemOne)
  })

  it('returns undefined when no annotation with a given id', () => {
    const anno = selectTask.getAnnotation(itemOne.id)
    expect(anno).toBe(undefined)
  })

  it('stores a new annotation', () => {
    selectTask.storeAnnotation(itemOne)
    expect(selectTask.annotations).toEqual([itemOne])
  })

  it('stores multiple new annotations', () => {
    selectTask.storeAnnotation(itemOne)
    selectTask.storeAnnotation(itemTwo)
    expect(selectTask.annotations).toEqual([itemOne, itemTwo])
  })

  it('updates an existing annotation', () => {
    selectTask.storeAnnotation(itemOne)
    itemOne.key = '123'
    selectTask.storeAnnotation(itemOne)
    expect(selectTask.annotations).toEqual([itemOne])
  })

  it('deletes an annotation', () => {
    selectTask.annotations = [itemOne]
    selectTask.deleteAnnotation(itemOne.id)
    expect(selectTask.annotations).toEqual([])
  })

  it('throws an error when no annotation to delete', () => {
    const del = function () {
      selectTask.deleteAnnotation(itemOne.id)
    }
    expect(del).toThrowError()
  })
})
