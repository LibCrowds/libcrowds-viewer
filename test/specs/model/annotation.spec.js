import Annotation from '@/model/Annotation'

describe('Annotation', () => {
  let opts = null
  let anno = null

  function createItems (props, n) {
    let i = 0
    let items = []
    for (let j = 0; j < n; j++) {
      let item = {}
      for (let prop in props) {
        item[prop] = `${props[prop]}${j}`
      }
      items.push(item)
    }
    return items
  }

  beforeEach(() => {
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

  it('adds creator when none exists', () => {
    const creator = {
      id: 'http://example.com/user1',
      name: 'me'
    }
    anno.addCreator(creator)
    expect(anno.creator).toBe(creator)
  })

  it('only adds the same creator once', () => {
    const creatorOne = {
      id: 'http://example.com/user1',
      name: 'me'
    }
    const creatorTwo = {
      name: 'me',
      id: 'http://example.com/user1'
    }
    anno.addCreator(creatorOne)
    anno.addCreator(creatorTwo)
    expect(anno.creator.id).toBe(creatorOne.id)
    expect(anno.creator.name).toBe(creatorOne.name)
  })

  it('updates the same creator', () => {
    const creatorOne = {
      id: 'http://example.com/user1',
      name: 'me'
    }
    const creatorTwo = {
      name: 'newname',
      id: 'http://example.com/user1'
    }
    anno.addCreator(creatorOne)
    anno.addCreator(creatorTwo)
    expect(anno.creator.id).toBe(creatorTwo.id)
    expect(anno.creator.name).toBe(creatorTwo.name)
  })

  it('creates an array with the second creator', () => {
    const creatorOne = {
      id: 'http://example.com/user1',
      name: 'me'
    }
    const creatorTwo = {
      id: 'http://example.com/user2',
      name: 'notme'
    }
    anno.addCreator(creatorOne)
    anno.addCreator(creatorTwo)
    expect(anno.creator.length).toBe(2)
    expect(anno.creator[0].id).toBe(creatorOne.id)
    expect(anno.creator[0].name).toBe(creatorOne.name)
    expect(anno.creator[1].id).toBe(creatorTwo.id)
    expect(anno.creator[1].name).toBe(creatorTwo.name)
  })

  it('adds multiple creators to existing array', () => {
    const creatorOne = {
      id: 'http://example.com/user1',
      name: 'me'
    }
    const creatorTwo = {
      id: 'http://example.com/user2',
      name: 'notme'
    }
    anno.creator = [creatorOne, creatorTwo]
    const newCreator = {
      id: 'http://example.com/user3',
      name: 'stillnotme'
    }
    anno.addCreator(newCreator)
    expect(anno.creator).toBe([creatorOne, creatorTwo, newCreator])
  })

  it('update creators in existing array', () => {
    const creatorOne = {
      id: 'http://example.com/user1',
      name: 'me'
    }
    const creatorTwo = {
      id: 'http://example.com/user2',
      name: 'notme'
    }
    anno.creator = [creatorOne, creatorTwo]
    const newCreator = {
      id: 'http://example.com/user1',
      name: 'meagain'
    }
    anno.addCreator(newCreator)
    expect(anno.creator).toBe([creatorOne, newCreator])
  })

  it('adds generator when none exists', () => {
    const generator = {
      id: 'http://example.com/client1',
      name: 'Code'
    }
    anno.addGenerator(generator)
    expect(anno.generator).toBe(generator)
  })

  it('only adds the same generator once', () => {
    const generatorOne = {
      id: 'http://example.com/client1',
      name: 'Code'
    }
    const generatorTwo = {
      name: 'Code',
      id: 'http://example.com/client1'
    }
    anno.addGenerator(generatorOne)
    anno.addGenerator(generatorTwo)
    expect(anno.generator.id).toBe(generatorOne.id)
    expect(anno.generator.name).toBe(generatorOne.name)
  })

  it('updates the same generator', () => {
    const generatorOne = {
      id: 'http://example.com/client1',
      name: 'Code'
    }
    const generatorTwo = {
      name: 'Code v2',
      id: 'http://example.com/client1'
    }
    anno.addGenerator(generatorOne)
    anno.addGenerator(generatorTwo)
    expect(anno.generator.id).toBe(generatorTwo.id)
    expect(anno.generator.name).toBe(generatorTwo.name)
  })

  it('creates an array with the second generator', () => {
    const generatorOne = {
      id: 'http://example.com/client1',
      name: 'Code'
    }
    const generatorTwo = {
      id: 'http://example.com/client2',
      name: 'Code v2'
    }
    anno.addCreator(generatorOne)
    anno.addCreator(generatorTwo)
    expect(anno.generator.length).toBe(2)
    expect(anno.generator[0].id).toBe(generatorOne.id)
    expect(anno.generator[0].name).toBe(generatorOne.name)
    expect(anno.generator[1].id).toBe(generatorTwo.id)
    expect(anno.generator[1].name).toBe(generatorTwo.name)
  })

  it('adds multiple generators to existing array', () => {
    const generatorOne = {
      id: 'http://example.com/client1',
      name: 'Code'
    }
    const generatorTwo = {
      id: 'http://example.com/client2',
      name: 'Code v2'
    }
    anno.creator = [generatorOne, generatorTwo]
    const newGenerator = {
      id: 'http://example.com/client3',
      name: 'Code v3'
    }
    anno.addCreator(newGenerator)
    expect(anno.generator).toBe([generatorOne, generatorTwo, newGenerator])
  })

  it('update generators in existing array', () => {
    const generatorOne = {
      id: 'http://example.com/client1',
      name: 'Code'
    }
    const generatorTwo = {
      id: 'http://example.com/client2',
      name: 'Code v2'
    }
    anno.creator = [generatorOne, generatorTwo]
    const newGenerator = {
      id: 'http://example.com/client2',
      name: 'Code v3'
    }
    anno.addCreator(newGenerator)
    expect(anno.generator).toBe([generatorOne, newGenerator])
  })
})
