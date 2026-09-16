

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


describe('DealEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CHEAPSHARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('CHEAPSHARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CheapsharkSDK.test()
    const ent = testsdk.Deal()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CHEAPSHARK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deal.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"dealID","req":false,"short":"Unique identifier for the deal","type":"`$STRING`","index$":0},{"active":true,"name":"dealRating","req":false,"short":"Rating of the deal","type":"`$STRING`","index$":1},{"active":true,"name":"gameID","req":false,"short":"Game identifier","type":"`$STRING`","index$":2},{"active":true,"name":"internalName","req":false,"short":"Internal name of the game","type":"`$STRING`","index$":3},{"active":true,"name":"isOnSale","req":false,"short":"Whether the game is on sale (0 or 1)","type":"`$STRING`","index$":4},{"active":true,"name":"lastChange","req":false,"short":"Unix timestamp of last price change","type":"`$INTEGER`","index$":5},{"active":true,"name":"metacriticLink","req":false,"short":"Link to Metacritic page","type":"`$STRING`","index$":6},{"active":true,"name":"metacriticScore","req":false,"short":"Metacritic score","type":"`$STRING`","index$":7},{"active":true,"name":"normalPrice","req":false,"short":"Regular price","type":"`$STRING`","index$":8},{"active":true,"name":"releaseDate","req":false,"short":"Unix timestamp of release date","type":"`$INTEGER`","index$":9},{"active":true,"name":"salePrice","req":false,"short":"Current sale price","type":"`$STRING`","index$":10},{"active":true,"name":"savings","req":false,"short":"Percentage savings","type":"`$STRING`","index$":11},{"active":true,"name":"steamAppID","req":false,"short":"Steam App ID","type":"`$STRING`","index$":12},{"active":true,"name":"steamRatingCount","req":false,"short":"Number of Steam ratings","type":"`$STRING`","index$":13},{"active":true,"name":"steamRatingPercent","req":false,"short":"Steam rating percentage","type":"`$STRING`","index$":14},{"active":true,"name":"steamRatingText","req":false,"short":"Steam rating description","type":"`$STRING`","index$":15},{"active":true,"name":"storeID","req":false,"short":"Store identifier","type":"`$STRING`","index$":16},{"active":true,"name":"thumb","req":false,"short":"Thumbnail image URL","type":"`$STRING`","index$":17},{"active":true,"name":"title","req":false,"short":"Title of the game","type":"`$STRING`","index$":18}],"name":"deal","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"aaa","orig":"aaa","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"desc","orig":"desc","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":0,"kind":"query","name":"exact","orig":"exact","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"lower_price","orig":"lower_price","reqd":false,"type":"`$NUMBER`","index$":3},{"active":true,"kind":"query","name":"metacritic","orig":"metacritic","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"kind":"query","name":"on_sale","orig":"on_sale","reqd":false,"type":"`$INTEGER`","index$":5},{"active":true,"kind":"query","name":"output","orig":"output","reqd":false,"type":"`$STRING`","index$":6},{"active":true,"example":0,"kind":"query","name":"page_number","orig":"page_number","reqd":false,"type":"`$INTEGER`","index$":7},{"active":true,"example":60,"kind":"query","name":"page_size","orig":"page_size","reqd":false,"type":"`$INTEGER`","index$":8},{"active":true,"kind":"query","name":"sort_by","orig":"sort_by","reqd":false,"type":"`$STRING`","index$":9},{"active":true,"kind":"query","name":"steam_app_id","orig":"steam_app_id","reqd":false,"type":"`$STRING`","index$":10},{"active":true,"kind":"query","name":"steam_rating","orig":"steam_rating","reqd":false,"type":"`$INTEGER`","index$":11},{"active":true,"kind":"query","name":"steamwork","orig":"steamwork","reqd":false,"type":"`$INTEGER`","index$":12},{"active":true,"kind":"query","name":"store_id","orig":"store_id","reqd":false,"type":"`$INTEGER`","index$":13},{"active":true,"kind":"query","name":"title","orig":"title","reqd":false,"type":"`$STRING`","index$":14},{"active":true,"kind":"query","name":"upper_price","orig":"upper_price","reqd":false,"type":"`$NUMBER`","index$":15}]},"contract":{"id":"GET /deals","json":"{\"operationId\":\"getDeals\",\"parameters\":[{\"description\":\"Filter deals by store ID\",\"in\":\"query\",\"name\":\"storeID\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Page number for pagination (default: 0)\",\"in\":\"query\",\"name\":\"pageNumber\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Number of deals per page (default: 60, max: 60)\",\"in\":\"query\",\"name\":\"pageSize\",\"required\":false,\"schema\":{\"default\":60,\"maximum\":60,\"type\":\"integer\"}},{\"description\":\"Sort deals by criteria\",\"in\":\"query\",\"name\":\"sortBy\",\"required\":false,\"schema\":{\"enum\":[\"Deal Rating\",\"Title\",\"Savings\",\"Price\",\"Metacritic\",\"Reviews\",\"Release\",\"Store\",\"recent\"],\"type\":\"string\"}},{\"description\":\"Sort in descending order (0 = ascending, 1 = descending)\",\"in\":\"query\",\"name\":\"desc\",\"required\":false,\"schema\":{\"default\":0,\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Minimum price for deals\",\"in\":\"query\",\"name\":\"lowerPrice\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Maximum price for deals\",\"in\":\"query\",\"name\":\"upperPrice\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Minimum Metacritic score\",\"in\":\"query\",\"name\":\"metacritic\",\"required\":false,\"schema\":{\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Minimum Steam rating (0-100)\",\"in\":\"query\",\"name\":\"steamRating\",\"required\":false,\"schema\":{\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Filter by Steam App ID\",\"in\":\"query\",\"name\":\"steamAppID\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Search for deals by game title\",\"in\":\"query\",\"name\":\"title\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Exact match for title search (0 = fuzzy, 1 = exact)\",\"in\":\"query\",\"name\":\"exact\",\"required\":false,\"schema\":{\"default\":0,\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Filter for AAA titles (0 = all, 1 = AAA only)\",\"in\":\"query\",\"name\":\"AAA\",\"required\":false,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Filter for Steamworks games (0 = all, 1 = Steamworks only)\",\"in\":\"query\",\"name\":\"steamworks\",\"required\":false,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Filter for games on sale (0 = all, 1 = on sale only)\",\"in\":\"query\",\"name\":\"onSale\",\"required\":false,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Output format (default: json)\",\"in\":\"query\",\"name\":\"output\",\"required\":false,\"schema\":{\"enum\":[\"json\",\"rss\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"dealID\":{\"description\":\"Unique identifier for the deal\",\"type\":\"string\"},\"dealRating\":{\"description\":\"Rating of the deal\",\"type\":\"string\"},\"gameID\":{\"description\":\"Game identifier\",\"type\":\"string\"},\"internalName\":{\"description\":\"Internal name of the game\",\"type\":\"string\"},\"isOnSale\":{\"description\":\"Whether the game is on sale (0 or 1)\",\"type\":\"string\"},\"lastChange\":{\"description\":\"Unix timestamp of last price change\",\"type\":\"integer\"},\"metacriticLink\":{\"description\":\"Link to Metacritic page\",\"type\":\"string\"},\"metacriticScore\":{\"description\":\"Metacritic score\",\"type\":\"string\"},\"normalPrice\":{\"description\":\"Regular price\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Unix timestamp of release date\",\"type\":\"integer\"},\"salePrice\":{\"description\":\"Current sale price\",\"type\":\"string\"},\"savings\":{\"description\":\"Percentage savings\",\"type\":\"string\"},\"steamAppID\":{\"description\":\"Steam App ID\",\"type\":\"string\"},\"steamRatingCount\":{\"description\":\"Number of Steam ratings\",\"type\":\"string\"},\"steamRatingPercent\":{\"description\":\"Steam rating percentage\",\"type\":\"string\"},\"steamRatingText\":{\"description\":\"Steam rating description\",\"type\":\"string\"},\"storeID\":{\"description\":\"Store identifier\",\"type\":\"string\"},\"thumb\":{\"description\":\"Thumbnail image URL\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the game\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of deals\"},\"400\":{\"description\":\"Bad request - invalid parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/deals","segments":[{"lit":"deals"}],"select":{"exist":["aaa","desc","exact","lower_price","metacritic","on_sale","output","page_number","page_size","sort_by","steam_app_id","steam_rating","steamwork","store_id","title","upper_price"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"deal","name__orig":"deal","Name":"Deal","name_":"deal","name-":"deal","NAME":"DEAL","index$":1}, {"active":true,"entity":"deal","key$":"BasicDealFlow","kind":"basic","name":"BasicDealFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"deal_ref01"}}],"index$":0}]}, 'Deal')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deal_ref01_data = Object.values(setup.data.existing.deal)[0] as any

    // LIST
    const deal_ref01_ent = client.Deal()
    const deal_ref01_match: any = {}

    const deal_ref01_list = (await deal_ref01_ent.list(deal_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/deal/DealTestData.json')

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
    ['deal01','deal02','deal03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CHEAPSHARK_TEST_DEAL_ENTID': idmap,
    'CHEAPSHARK_TEST_LIVE': 'FALSE',
    'CHEAPSHARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CHEAPSHARK_TEST_DEAL_ENTID']

  const live = 'TRUE' === env.CHEAPSHARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CHEAPSHARK_TEST_DEAL_ENTID']
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
  
