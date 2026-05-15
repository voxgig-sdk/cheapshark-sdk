
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CheapsharkSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CheapsharkSDK.test()
    equal(null !== testsdk, true)
  })

})
