export default class Env {
  private readonly env: ProcessEnv

  constructor (env: ProcessEnv = process.env) {
    this.env = Object.freeze({ ...env })
  }

  get = (name: string): string => {
    return this.env[name] || ''
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
