import fixtures from '../../fixtures'

describe('Task', () => {
  let transcribeTask = null

  beforeEach(() => {
    transcribeTask = fixtures.buildTask('transcribe')
  })

  it('updates a form', () => {
    const newForm = JSON.parse(JSON.stringify(transcribeTask.form))
    newForm.model.title = fixtures.uuid()
    expect(newForm).not.toEqual(transcribeTask.form)
    transcribeTask.updateForm(newForm)
    expect(newForm).toEqual(transcribeTask.form)
  })
})
