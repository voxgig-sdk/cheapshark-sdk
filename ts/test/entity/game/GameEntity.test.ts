

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


describe('GameEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CHEAPSHARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('CHEAPSHARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CheapsharkSDK.test()
    const ent = testsdk.Game()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CHEAPSHARK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'game.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cheapest":{"a":true,"h":"Cheapest","n":"cheapest","r":false,"sh":"Lowest price found","t":"`$STRING`","key$":"cheapest","index$":0},"cheapestDealID":{"a":true,"h":"Cheapest Deal Id","n":"cheapestDealID","r":false,"sh":"Deal ID for the cheapest price","t":"`$STRING`","key$":"cheapestDealID","index$":1},"external":{"a":true,"h":"External","n":"external","r":false,"sh":"External game title","t":"`$STRING`","key$":"external","index$":2},"gameID":{"a":true,"h":"Game Id","n":"gameID","r":false,"sh":"Unique game identifier","t":"`$STRING`","key$":"gameID","index$":3},"internalName":{"a":true,"h":"Internal Name","n":"internalName","r":false,"sh":"Internal game name","t":"`$STRING`","key$":"internalName","index$":4},"steamAppID":{"a":true,"h":"Steam App Id","n":"steamAppID","r":false,"sh":"Steam App ID","t":"`$STRING`","key$":"steamAppID","index$":5},"thumb":{"a":true,"h":"Thumb","n":"thumb","r":false,"sh":"Thumbnail image URL","t":"`$STRING`","key$":"thumb","index$":6}},"name":"game","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /games","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":0,"k":"query","n":"exact","or":"exact","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":60,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"steam_app_id","or":"steam_app_id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"title","or":"title","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/games","q":{"exist":["exact","limit","steam_app_id","title"]},"r":{},"s":[{"lit":"games"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"game","name__orig":"game","Name":"Game","name_":"game","name-":"game","NAME":"GAME","index$":2}, {"active":true,"entity":"game","key$":"BasicGameFlow","kind":"basic","name":"BasicGameFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"game_ref01"}}],"index$":0}]}, 'Game', {"GET /games":{"protocol":"http","operationId":"searchGames","responses":{"200":{"description":"Successful response with list of games","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"gameID":{"type":"string","description":"Unique game identifier","key$":"gameID"},"steamAppID":{"type":"string","description":"Steam App ID","key$":"steamAppID"},"cheapest":{"type":"string","description":"Lowest price found","key$":"cheapest"},"cheapestDealID":{"type":"string","description":"Deal ID for the cheapest price","key$":"cheapestDealID"},"external":{"type":"string","description":"External game title","key$":"external"},"internalName":{"type":"string","description":"Internal game name","key$":"internalName"},"thumb":{"type":"string","description":"Thumbnail image URL","key$":"thumb"}},"x-ref":"#/components/schemas/Game","index$":0}}}}},"400":{"description":"Bad request - invalid parameters"}},"parameters":[{"name":"title","in":"query","description":"Game title to search for","required":false,"schema":{"type":"string"},"index$":0},{"name":"steamAppID","in":"query","description":"Steam App ID to search for","required":false,"schema":{"type":"string"},"index$":1},{"name":"limit","in":"query","description":"Maximum number of results (default: 60)","required":false,"schema":{"type":"integer","default":60},"index$":2},{"name":"exact","in":"query","description":"Exact match for title search (0 = fuzzy, 1 = exact)","required":false,"schema":{"type":"integer","enum":[0,1],"default":0},"index$":3}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let game_ref01_data = Object.values(setup.data.existing.game)[0] as any

    // LIST
    const game_ref01_ent = client.Game()
    const game_ref01_match: any = {}

    const game_ref01_list = (await game_ref01_ent.list(game_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/game/GameTestData.json')

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
    ['game01','game02','game03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CHEAPSHARK_TEST_GAME_ENTID': idmap,
    'CHEAPSHARK_TEST_LIVE': 'FALSE',
    'CHEAPSHARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CHEAPSHARK_TEST_GAME_ENTID']

  const live = 'TRUE' === env.CHEAPSHARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CHEAPSHARK_TEST_GAME_ENTID']
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
  
