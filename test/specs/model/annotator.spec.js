import fixtures from '../../fixtures'

describe('Annotator', () => {
  let annoOne = null
  let annoTwo = null
  let selectTask = null
  let transcribeTask = null
  let annotator = null

  beforeEach(() => {
    annoOne = fixtures.buildAnnotation()
    annoTwo = fixtures.buildAnnotation()
    selectTask = fixtures.buildTask('select')
    transcribeTask = fixtures.buildTask('transcribe')
    annotator = fixtures.buildAnnotator()
  })

  it('returns an annotation by id', () => {
    selectTask.annotations = [annoOne]
    const anno = annotator.getAnnotation(selectTask, annoOne.id)
    expect(anno).toBe(annoOne)
  })

  it('returns undefined when no annotation with a given id', () => {
    const anno = annotator.getAnnotation(selectTask, annoOne.id)
    expect(anno).toBe(undefined)
  })

  it('stores a new annotation', () => {
    annotator.storeAnnotation(selectTask, annoOne)
    expect(selectTask.annotations).toEqual([annoOne])
  })

  it('stores multiple new annotations', () => {
    annotator.storeAnnotation(selectTask, annoOne)
    annotator.storeAnnotation(selectTask, annoTwo)
    expect(selectTask.annotations).toEqual([annoOne, annoTwo])
  })

  it('updates an existing annotation', () => {
    annotator.storeAnnotation(selectTask, annoOne)
    annoOne.key = '123'
    annotator.storeAnnotation(selectTask, annoOne)
    expect(selectTask.annotations).toEqual([annoOne])
  })

  it('deletes an annotation', () => {
    selectTask.annotations = [annoOne]
    annotator.deleteAnnotation(selectTask, annoOne.id)
    expect(selectTask.annotations).toEqual([])
  })

  it('throws an error when no annotation to delete', () => {
    const del = function () {
      annotator.deleteAnnotation(selectTask, annoOne.id)
    }
    expect(del).toThrowError()
  })

  it('returns annotation from search', () => {
    selectTask.annotations = [annoOne, annoTwo]
    const found = annotator.searchAnnotations(selectTask, {
      id: annoOne.id
    })
    expect(found).toEqual([annoOne])
  })

  // it('gets form field annotation when one exists', () => {
  //   transcribeTask.annotations = [descriptionAnnotation]
  //   const anno = transcribeTask._getFormFieldAnnotation()
  //   expect(anno).not.toEqual(descriptionAnnotation)
  // })

  // it('returns undefined when no form field annotation exists', () => {

  // })

  // it('creates a new form field annotation', () => {
  //   expect(transcribeTask.annotations).toEqual([])
  //   const key = Object.keys(transcribeTask.form.model)[0]
  //   const value = fixtures.uuid()
  //   const anno = transcribeTask.storeFormFieldAnnotation(key, value)
  //   expect(transcribeTask.annotations).toEqual([anno])
  //   expect(anno).toEqual(jasmine.any(Number))
  // })

  // it('updates a form field annotation', () => {

  // })
})
