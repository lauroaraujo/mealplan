type ConsoleLoggerFunction = 'info' | 'log' | 'warn' | 'error'

export default class ConsoleMock {
  private static mocks: any = []
  private static history: string[] = []

  private constructor () {}

  private static mockConsoleLogger = (loggerFunction: ConsoleLoggerFunction) => {
    const mockFn = jest.spyOn(global.console, loggerFunction)
      .mockImplementation(ConsoleMock.log)

    ConsoleMock.mocks.push(mockFn)
  }

  private static log = (...args: [string]) => {
    ConsoleMock.history.push(args.join(' '))
  }

  private static clearHistory = () => {
    ConsoleMock.history = []
  }

  private static restore () {
    ConsoleMock.mocks.forEach((fn: any) => {
      fn.mockRestore()
    })
    ConsoleMock.mocks = []
  }

  static mock = () => {
    ConsoleMock.mockConsoleLogger('info')
    ConsoleMock.mockConsoleLogger('log')
    ConsoleMock.mockConsoleLogger('warn')
    ConsoleMock.mockConsoleLogger('error')
  }

  static getHistory = (lastN: number = 0): string[] => {
    return ConsoleMock.history.slice(-1 * lastN)
  }

  static getLastLog () {
    return ConsoleMock.history.length > 0
      ? ConsoleMock.history[ConsoleMock.history.length - 1]
      : ''
  }

  static reset () {
    ConsoleMock.restore()
    ConsoleMock.clearHistory()
  }
}
