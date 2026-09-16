

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cheapest","req":false,"short":"Lowest price found","type":"`$STRING`","index$":0},{"active":true,"name":"cheapestDealID","req":false,"short":"Deal ID for the cheapest price","type":"`$STRING`","index$":1},{"active":true,"name":"external","req":false,"short":"External game title","type":"`$STRING`","index$":2},{"active":true,"name":"gameID","req":false,"short":"Unique game identifier","type":"`$STRING`","index$":3},{"active":true,"name":"internalName","req":false,"short":"Internal game name","type":"`$STRING`","index$":4},{"active":true,"name":"steamAppID","req":false,"short":"Steam App ID","type":"`$STRING`","index$":5},{"active":true,"name":"thumb","req":false,"short":"Thumbnail image URL","type":"`$STRING`","index$":6}],"name":"game","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":0,"kind":"query","name":"exact","orig":"exact","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":60,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"steam_app_id","orig":"steam_app_id","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"title","orig":"title","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /games","json":"{\"operationId\":\"searchGames\",\"parameters\":[{\"description\":\"Game title to search for\",\"in\":\"query\",\"name\":\"title\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Steam App ID to search for\",\"in\":\"query\",\"name\":\"steamAppID\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of results (default: 60)\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":60,\"type\":\"integer\"}},{\"description\":\"Exact match for title search (0 = fuzzy, 1 = exact)\",\"in\":\"query\",\"name\":\"exact\",\"required\":false,\"schema\":{\"default\":0,\"enum\":[0,1],\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"cheapest\":{\"description\":\"Lowest price found\",\"type\":\"string\"},\"cheapestDealID\":{\"description\":\"Deal ID for the cheapest price\",\"type\":\"string\"},\"external\":{\"description\":\"External game title\",\"type\":\"string\"},\"gameID\":{\"description\":\"Unique game identifier\",\"type\":\"string\"},\"internalName\":{\"description\":\"Internal game name\",\"type\":\"string\"},\"steamAppID\":{\"description\":\"Steam App ID\",\"type\":\"string\"},\"thumb\":{\"description\":\"Thumbnail image URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of games\"},\"400\":{\"description\":\"Bad request - invalid parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/games","segments":[{"lit":"games"}],"select":{"exist":["exact","limit","steam_app_id","title"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"game","name__orig":"game","Name":"Game","name_":"game","name-":"game","NAME":"GAME","index$":2}, {"active":true,"entity":"game","key$":"BasicGameFlow","kind":"basic","name":"BasicGameFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"game_ref01"}}],"index$":0}]}, 'Game')
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
  
