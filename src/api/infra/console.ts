export default class Console {
  private history: string[]

  private constructor(private console: InfraConsole, private maxHistory: number = 0) {
    this.history = new Array<string>(this.maxHistory).fill('')
  }

  static create = (maxHistory?: number) => new Console(global.console, maxHistory)
  static createNull = (maxHistory?: number) => new Console(new NullableConsole(), maxHistory)

  private getOutputString = (args: any[]): string => args.join(' ')
  private addToHistory = (output: string) => {
    this.history.push(output)
    this.history.shift()
  }

  getHistory = (lastN: number = 0): string[] => {
    const begin = Math.max(Math.min(lastN, this.maxHistory), 0)
    return this.history.slice(-1 * begin)
  }

  getLastLog = (): string => this.history[this.history.length - 1] || ''

  log = (...args: any[]) => {
    const output = this.getOutputString(args)
    this.console.log(output)
    this.addToHistory(output)
  }

  warn = (...args: any[]) => {
    const output = this.getOutputString(args)
    this.console.warn(output)
    this.addToHistory(output)
  }

  error = (...args: any[]) => {
    const output = this.getOutputString(args)
    this.console.error(output)
    this.addToHistory(output)
  }
}

interface InfraConsole {
  log: (...args: any[]) => void,
  warn: (...args: any[]) => void,
  error: (...args: any[]) => void,
}

class NullableConsole implements InfraConsole {
  log () {}
  warn () {}
  error () {}
}
