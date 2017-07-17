import filterAnnotations from '@/utils/filterAnnotations'

describe('filterAnnotations', () => {
  let annotations = null

  beforeEach(() => {
    annotations = [
      {
        motivation: 'testing'
      }
    ]
  })

  it('filters by motivation', () => {
    let hasAnnotation = filterAnnotations({
      annotations: annotations,
      motivation: 'testing'
    })
    let doesNotHaveAnnotation = filterAnnotations({
      annotations: annotations,
      motivation: 'something-else'
    })

    expect(hasAnnotation).toEqual(annotations)
    expect(doesNotHaveAnnotation).toEqual([])
  })
})
