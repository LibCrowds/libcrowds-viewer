import fixtures from '../../fixtures'

describe('Annotator', () => {
  let annoOne = null
  let annoTwo = null
  let transcribeAnno = null
  let selectAnno = null
  let commentAnno = null
  let selectTask = null
  let transcribeTask = null
  let annotator = null
  let itemOne = null
  let itemTwo = null
  let itemThree = null

  beforeEach(() => {
    annoOne = fixtures.buildAnnotation()
    annoTwo = fixtures.buildAnnotation()
    transcribeAnno = fixtures.buildTranscribeAnnotation()
    selectAnno = fixtures.buildSelectAnnotation()
    commentAnno = fixtures.buildCommentAnnotation()
    selectTask = fixtures.buildTask('select')
    transcribeTask = fixtures.buildTask('transcribe')
    annotator = fixtures.buildAnnotator()
    itemOne = fixtures.buildItem(1)
    itemTwo = fixtures.buildItem(2)
    itemThree = fixtures.buildItem(3)
  })

  describe('_search', () => {
    it('returns true when searching for matching value', () => {
      const value = fixtures.uuid()
      annoOne.id = value
      const result = annotator._search(annoOne, {
        id: value
      })
      expect(result).toBe(true)
    })

    it('returns false when searching for non-matching value', () => {
      const value = fixtures.uuid()
      const anotherValue = fixtures.uuid()
      annoOne.id = value
      const result = annotator._search(annoOne, {
        id: anotherValue
      })
      expect(result).toBe(false)
    })

    it('returns false when searching for non-existant value', () => {
      const result = annotator._search(annoOne, {
        id: fixtures.uuid()
      })
      expect(result).toBe(false)
    })

    it('returns true when searching for matching array value', () => {
      annoOne.body = [itemOne, itemTwo]
      const result = annotator._search(annoOne, {
        body: itemOne
      })
      expect(result).toBe(true)
    })

    it('returns false when searching for non-matching array value', () => {
      annoOne.body = [itemOne, itemTwo]
      const result = annotator._search(annoOne, {
        body: itemThree
      })
      expect(result).toBe(false)
    })

    it('returns false when searching for non-existant array value', () => {
      const result = annotator._search(annoOne, {
        body: itemOne
      })
      expect(result).toBe(false)
    })
  })

  describe('getTranscribeAnnotations', () => {
    it('returns transcribe annotations only', () => {
      transcribeTask.annotations = [annoOne, transcribeAnno]
      const result = annotator.getTranscribeAnnotations(transcribeTask)
      expect(result).toEqual([transcribeAnno])
    })
  })

  describe('getSelectAnnotations', () => {
    it('returns select annotations only', () => {
      selectTask.annotations = [selectAnno, annoOne]
      const result = annotator.getSelectAnnotations(selectTask)
      expect(result).toEqual([selectAnno])
    })
  })

  describe('getCommentAnnotation', () => {
    it('gets CommentAnnotation when one exists', () => {
      transcribeTask.annotations = [commentAnno]
      const anno = annotator.getCommentAnnotation(transcribeTask)
      expect(anno).toEqual(commentAnno)
    })

    it('returns null when no CommentAnnotation exists', () => {
      const key = fixtures.uuid()
      const anno = annotator.getCommentAnnotation(transcribeTask, key)
      expect(anno).toEqual(null)
    })
  })

  describe('_getFormFieldAnnotation', () => {
    it('gets form field annotation when one exists', () => {
      const key = Object.keys(transcribeTask.form.model)[0]
      transcribeTask.annotations = [transcribeAnno]
      const anno = annotator._getFormFieldAnnotation(transcribeTask, key)
      expect(anno).not.toEqual(transcribeAnno)
    })

    it('returns null when form field annotation does not exist', () => {
      const key = fixtures.uuid()
      const anno = annotator._getFormFieldAnnotation(transcribeTask, key)
      expect(anno).toEqual(null)
    })
  })

  describe('getAnnotation', () => {
    it('returns an annotation by id', () => {
      selectTask.annotations = [annoOne]
      const anno = annotator.getAnnotation(selectTask, annoOne.id)
      expect(anno).toBe(annoOne)
    })

    it('returns null when no annotation with a given id', () => {
      const anno = annotator.getAnnotation(selectTask, annoOne.id)
      expect(anno).toBe(null)
    })
  })

  describe('storeAnnotation', () => {
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
  })

  describe('deleteAnnotation', () => {
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
  })

  describe('filterAnnotations', () => {
    it('returns annotation from search', () => {
      const annotations = [annoOne, annoTwo]
      const filtered = annotator.filterAnnotations(annotations, {
        id: annoOne.id
      })
      expect(filtered).toEqual([annoOne])
    })
  })

  describe('storeTranscriptionAnnotation', () => {
    it('stores a new TranscriptionAnnotation', () => {
      const key = Object.keys(transcribeTask.form.model)[0]
      const value = fixtures.uuid()
      annotator.storeTranscriptionAnnotation(transcribeTask, key, value)
      expect(transcribeTask.annotations.length).toBe(1)
      expect(transcribeTask.annotations[0].motivation).toBe('describing')
    })

    it('updates an existing TranscriptionAnnotation', () => {
      const key = Object.keys(transcribeTask.form.model)[0]
      const value = fixtures.uuid()
      const newTranscribeAnno = fixtures.buildTranscribeAnnotation(key)
      transcribeTask.annotations = [newTranscribeAnno]
      annotator.storeTranscriptionAnnotation(transcribeTask, key, value)
      expect(transcribeTask.annotations.length).toBe(1)
      expect(transcribeTask.annotations[0].id).toEqual(newTranscribeAnno.id)
      expect(transcribeTask.annotations[0].body[
        transcribeTask.annotations[0].body.length - 1
      ].value).toEqual(value)
    })
  })

  describe('storeCommentAnnotation', () => {
    it('stores a new CommentAnnotation', () => {
      const comment = fixtures.uuid()
      annotator.storeCommentAnnotation(transcribeTask, comment)
      expect(transcribeTask.annotations.length).toBe(1)
      expect(transcribeTask.annotations[0].motivation).toBe('commenting')
    })

    it('updates an existing CommentAnnotation', () => {
      transcribeTask.annotations = [commentAnno]
      const comment = fixtures.uuid()
      annotator.storeCommentAnnotation(transcribeTask, comment)
      expect(transcribeTask.annotations).toEqual([commentAnno])
    })
  })

  describe('createSelectAnnotation', () => {
    it('stores a new SelectAnnotation', () => {
      const tag = fixtures.uuid()
      annotator.SelectAnnotation(selectTask, tag)
      expect(selectTask.annotations.length).toBe(1)
      expect(selectTask.annotations[0].motivation).toBe('tagging')
    })
  })
})
