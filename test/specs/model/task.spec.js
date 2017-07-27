import Task from '@/model/Task'
import Annotation from '@/model/Annotation'

describe('Annotation', () => {
  let task = null
  let annoOpts = null
  let taskOpts = null
  let annoOne = null
  let annoTwo = null

  beforeEach(() => {
    annoOpts = {
      imgInfo: {
        id: 'http://example.com/img',
        context: 'http://example.com/context',
        height: 100,
        width: 100
      },
      motivation: 'testing'
    }
    taskOpts = {
      mode: 'select',
      tag: 'sometag',
      imgInfoUri: 'http://www.example.org/image-service/abcd1234/info.json',
      imgInfo: {}
    }
    annoOne = new Annotation(annoOpts)
    annoTwo = new Annotation(annoOpts)
    task = new Task(taskOpts)
  })

  it('returns an annotation by id', () => {
    task.annotations = [annoOne]
    const anno = task.getAnnotation(annoOne.id)
    expect(anno).toBe(annoOne)
  })

  it('returns undefined when no annotation with a given id', () => {
    const anno = task.getAnnotation(annoOne.id)
    expect(anno).toBe(undefined)
  })

  it('stores a new annotation', () => {
    task.storeAnnotation(annoOne)
    expect(task.annotations).toEqual([annoOne])
  })

  it('stores multiple new annotations', () => {
    task.storeAnnotation(annoOne)
    task.storeAnnotation(annoTwo)
    expect(task.annotations).toEqual([annoOne, annoTwo])
  })

  it('updates an existing annotation', () => {
    task.storeAnnotation(annoOne)
    annoOne.key = '123'
    task.storeAnnotation(annoOne)
    expect(task.annotations).toEqual([annoOne])
  })

  it('deletes an annotation', () => {
    task.annotations = [annoOne]
    task.deleteAnnotation(annoOne.id)
    expect(task.annotations).toEqual([])
  })

  it('throws an error when no annotation to delete', () => {
    const del = function () {
      task.deleteAnnotation(annoOne.id)
    }
    expect(del).toThrowError()
  })

  it('returns annotation from search', () => {
    task.annotations = [annoOne, annoTwo]
    const found = task.searchAnnotations({
      id: annoOne.id
    })
    expect(found).toEqual([annoOne])
  })
})
