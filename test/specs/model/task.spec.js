import Task from '@/model/Task'
import Annotation from '@/model/Annotation'

describe('Annotation', () => {
  let selectTask = null
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
    selectTask = new Task(taskOpts)
  })

  it('returns an annotation by id', () => {
    selectTask.annotations = [annoOne]
    const anno = selectTask.getAnnotation(annoOne.id)
    expect(anno).toBe(annoOne)
  })

  it('returns undefined when no annotation with a given id', () => {
    const anno = selectTask.getAnnotation(annoOne.id)
    expect(anno).toBe(undefined)
  })

  it('stores a new annotation', () => {
    selectTask.storeAnnotation(annoOne)
    expect(selectTask.annotations).toEqual([annoOne])
  })

  it('stores multiple new annotations', () => {
    selectTask.storeAnnotation(annoOne)
    selectTask.storeAnnotation(annoTwo)
    expect(selectTask.annotations).toEqual([annoOne, annoTwo])
  })

  it('updates an existing annotation', () => {
    selectTask.storeAnnotation(annoOne)
    annoOne.key = '123'
    selectTask.storeAnnotation(annoOne)
    expect(selectTask.annotations).toEqual([annoOne])
  })

  it('deletes an annotation', () => {
    selectTask.annotations = [annoOne]
    selectTask.deleteAnnotation(annoOne.id)
    expect(selectTask.annotations).toEqual([])
  })

  it('throws an error when no annotation to delete', () => {
    const del = function () {
      selectTask.deleteAnnotation(annoOne.id)
    }
    expect(del).toThrowError()
  })
})
