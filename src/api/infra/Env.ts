export default class Env {
  private constructor (private _env = process.env) {}

  static create() {
    return new Env()
  }

  static createNull(_env: ProcessEnv) {
    return new Env(_env)
  }

  get = (name: string): string => {
    return this._env[name] || ''
  }

  getNumber = (name: string, defaultValue?: number): number => {
    const val = this.get(name)

    const num = Number.parseFloat(val)

    if (!Number.isNaN(num)) {
      return num
    }

    if (defaultValue !== undefined) {
      return defaultValue
    }

    throw new Error(`EnvInvalidValue: variable "${name}" is not a number. Was: "${val}"`)
  }
}

interface ProcessEnv {
  [key: string]: string | undefined;
}
