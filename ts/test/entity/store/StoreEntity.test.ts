

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CheapsharkSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('StoreEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CHEAPSHARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('CHEAPSHARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CheapsharkSDK.test()
    const ent = testsdk.Store()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CHEAPSHARK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'store.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"images":{"a":true,"h":"Images","n":"images","r":false,"t":"`$OBJECT`","key$":"images","index$":0},"isActive":{"a":true,"h":"Is Active","n":"isActive","r":false,"sh":"Whether the store is active (0 or 1)","t":"`$INTEGER`","key$":"isActive","index$":1},"storeID":{"a":true,"h":"Store Id","n":"storeID","r":false,"sh":"Unique store identifier","t":"`$STRING`","key$":"storeID","index$":2},"storeName":{"a":true,"h":"Store Name","n":"storeName","r":false,"sh":"Name of the store","t":"`$STRING`","key$":"storeName","index$":3}},"name":"store","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /stores","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/stores","q":{},"r":{},"s":[{"lit":"stores"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"store","name__orig":"store","Name":"Store","name_":"store","name-":"store","NAME":"STORE","index$":3}, {"active":true,"entity":"store","key$":"BasicStoreFlow","kind":"basic","name":"BasicStoreFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"store_ref01"}}],"index$":0}]}, 'Store', {"GET /stores":{"protocol":"http","operationId":"getStores","responses":{"200":{"description":"Successful response with list of stores","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"storeID":{"type":"string","description":"Unique store identifier","key$":"storeID"},"storeName":{"type":"string","description":"Name of the store","key$":"storeName"},"isActive":{"type":"integer","description":"Whether the store is active (0 or 1)","key$":"isActive"},"images":{"type":"object","properties":{"banner":{"type":"string","description":"Banner image URL"},"logo":{"type":"string","description":"Logo image URL"},"icon":{"type":"string","description":"Icon image URL"}},"key$":"images"}},"x-ref":"#/components/schemas/Store","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let store_ref01_data = Object.values(setup.data.existing.store)[0] as any

    // LIST
    const store_ref01_ent = client.Store()
    const store_ref01_match: any = {}

    const store_ref01_list = (await store_ref01_ent.list(store_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/store/StoreTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CheapsharkSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['store01','store02','store03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CHEAPSHARK_TEST_STORE_ENTID': idmap,
    'CHEAPSHARK_TEST_LIVE': 'FALSE',
    'CHEAPSHARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CHEAPSHARK_TEST_STORE_ENTID']

  const live = 'TRUE' === env.CHEAPSHARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CHEAPSHARK_TEST_STORE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CheapsharkSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CHEAPSHARK_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
