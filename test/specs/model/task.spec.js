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

  it('stores a new annotation', () => {
    selectTask.storeAnnotation(itemOne)
    expect(selectTask.annotations).toBe([itemOne])
  })

  it('stores multiple new annotations', () => {
    selectTask.storeAnnotation(itemOne)
    selectTask.storeAnnotation(itemTwo)
    expect(selectTask.annotations).toBe([itemOne, itemTwo])
  })

  it('updates an existing annotation', () => {
    selectTask.storeAnnotation(itemOne)
    itemOne.key = '123'
    selectTask.storeAnnotation(itemOne)
    expect(selectTask.annotations).toBe([itemOne])
  })
})
