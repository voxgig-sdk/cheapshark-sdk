
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CheapsharkSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CheapsharkSDK.test()
    equal(testsdk instanceof CheapsharkSDK, true,
      'CheapsharkSDK.test() must return a client synchronously')
  })

})
