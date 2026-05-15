
import { Context } from './Context'


class CheapsharkError extends Error {

  isCheapsharkError = true

  sdk = 'Cheapshark'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CheapsharkError
}

