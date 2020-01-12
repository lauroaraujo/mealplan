import Console from './console'

describe('Console Infrastructure', () => {
  it ('can return the last output', () => {
    const console = Console.createNull(1)

    const log = 'This is a log'
    console.log(log)
    expect(console.getLastLog()).toEqual(log)
  })

  it ('can configure the history size', () => {
    const console = Console.createNull(2)
    expect(console.getHistory()).toEqual(new Array(2).fill(''))
  })

  it ('gets the last N history items', () => {
    const maxHistory = 3
    const console = Console.createNull(maxHistory)

    console.log('log 1')
    console.log('log 2')
    console.log('log 3')

    expect(console.getHistory(2)).toEqual(['log 2', 'log 3'])
  })

  it ('log history rotates correctly', () => {
    const console = Console.createNull(2)

    const logs = ['first log', 'second log', 'third']
    console.log(logs[0])
    console.warn(logs[1])
    expect(console.getHistory()).toEqual(logs.slice(0, 2))

    console.error(logs[2])
    expect(console.getHistory()).toEqual(logs.slice(1, 3))
  })

  it('log() works.', () => {
    const console = Console.createNull(1)

    const log = 'I am calling console.log()'
    console.log(log)
    expect(console.getLastLog()).toEqual(log)

    const multiArgLog = [ 'This is a call to all my', 'past resignations!' ]
    console.log(...multiArgLog)
    expect(console.getLastLog()).toEqual(multiArgLog.join(' '))
  })

  it('warn() works.', () => {
    const console = Console.createNull(1)

    const warn = 'I am calling console.warn()'
    console.warn(warn)
    expect(console.getLastLog()).toEqual(warn)

    const multiArgWarn = [ 'This is a warning to all my', 'past resignations!' ]
    console.warn(...multiArgWarn)
    expect(console.getLastLog()).toEqual(multiArgWarn.join(' '))
  })

  it('error() works.', () => {
    const console = Console.createNull(1)

    const error = 'I am calling console.error()'
    console.error(error)
    expect(console.getLastLog()).toEqual(error)

    const multiArgError = [ 'This is call to all my', 'past errors!' ]
    console.error(...multiArgError)
    expect(console.getLastLog()).toEqual(multiArgError.join(' '))
  })
})
