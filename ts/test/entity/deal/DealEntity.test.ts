

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dealID":{"a":true,"h":"Deal Id","n":"dealID","r":false,"sh":"Unique identifier for the deal","t":"`$STRING`","key$":"dealID","index$":0},"dealRating":{"a":true,"h":"Deal Rating","n":"dealRating","r":false,"sh":"Rating of the deal","t":"`$STRING`","key$":"dealRating","index$":1},"gameID":{"a":true,"h":"Game Id","n":"gameID","r":false,"sh":"Game identifier","t":"`$STRING`","key$":"gameID","index$":2},"internalName":{"a":true,"h":"Internal Name","n":"internalName","r":false,"sh":"Internal name of the game","t":"`$STRING`","key$":"internalName","index$":3},"isOnSale":{"a":true,"h":"Is On Sale","n":"isOnSale","r":false,"sh":"Whether the game is on sale (0 or 1)","t":"`$STRING`","key$":"isOnSale","index$":4},"lastChange":{"a":true,"h":"Last Change","n":"lastChange","r":false,"sh":"Unix timestamp of last price change","t":"`$INTEGER`","key$":"lastChange","index$":5},"metacriticLink":{"a":true,"h":"Metacritic Link","n":"metacriticLink","r":false,"sh":"Link to Metacritic page","t":"`$STRING`","key$":"metacriticLink","index$":6},"metacriticScore":{"a":true,"h":"Metacritic Score","n":"metacriticScore","r":false,"sh":"Metacritic score","t":"`$STRING`","key$":"metacriticScore","index$":7},"normalPrice":{"a":true,"h":"Normal Price","n":"normalPrice","r":false,"sh":"Regular price","t":"`$STRING`","key$":"normalPrice","index$":8},"releaseDate":{"a":true,"h":"Release Date","n":"releaseDate","r":false,"sh":"Unix timestamp of release date","t":"`$INTEGER`","key$":"releaseDate","index$":9},"salePrice":{"a":true,"h":"Sale Price","n":"salePrice","r":false,"sh":"Current sale price","t":"`$STRING`","key$":"salePrice","index$":10},"savings":{"a":true,"h":"Savings","n":"savings","r":false,"sh":"Percentage savings","t":"`$STRING`","key$":"savings","index$":11},"steamAppID":{"a":true,"h":"Steam App Id","n":"steamAppID","r":false,"sh":"Steam App ID","t":"`$STRING`","key$":"steamAppID","index$":12},"steamRatingCount":{"a":true,"h":"Steam Rating Count","n":"steamRatingCount","r":false,"sh":"Number of Steam ratings","t":"`$STRING`","key$":"steamRatingCount","index$":13},"steamRatingPercent":{"a":true,"h":"Steam Rating Percent","n":"steamRatingPercent","r":false,"sh":"Steam rating percentage","t":"`$STRING`","key$":"steamRatingPercent","index$":14},"steamRatingText":{"a":true,"h":"Steam Rating Text","n":"steamRatingText","r":false,"sh":"Steam rating description","t":"`$STRING`","key$":"steamRatingText","index$":15},"storeID":{"a":true,"h":"Store Id","n":"storeID","r":false,"sh":"Store identifier","t":"`$STRING`","key$":"storeID","index$":16},"thumb":{"a":true,"h":"Thumb","n":"thumb","r":false,"sh":"Thumbnail image URL","t":"`$STRING`","key$":"thumb","index$":17},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the game","t":"`$STRING`","key$":"title","index$":18}},"name":"deal","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /deals","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"aaa","or":"aaa","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"desc","or":"desc","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"exact","or":"exact","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"lower_price","or":"lower_price","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"metacritic","or":"metacritic","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"on_sale","or":"on_sale","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"output","or":"output","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":0,"k":"query","n":"page_number","or":"page_number","r":false,"t":"`$INTEGER`","index$":7},{"a":true,"ex":60,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":8},{"a":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"steam_app_id","or":"steam_app_id","r":false,"t":"`$STRING`","index$":10},{"a":true,"k":"query","n":"steam_rating","or":"steam_rating","r":false,"t":"`$INTEGER`","index$":11},{"a":true,"k":"query","n":"steamwork","or":"steamwork","r":false,"t":"`$INTEGER`","index$":12},{"a":true,"k":"query","n":"store_id","or":"store_id","r":false,"t":"`$INTEGER`","index$":13},{"a":true,"k":"query","n":"title","or":"title","r":false,"t":"`$STRING`","index$":14},{"a":true,"k":"query","n":"upper_price","or":"upper_price","r":false,"t":"`$NUMBER`","index$":15}]},"k":"http","m":"GET","o":"/deals","q":{"exist":["aaa","desc","exact","lower_price","metacritic","on_sale","output","page_number","page_size","sort_by","steam_app_id","steam_rating","steamwork","store_id","title","upper_price"]},"r":{},"s":[{"lit":"deals"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"deal","name__orig":"deal","Name":"Deal","name_":"deal","name-":"deal","NAME":"DEAL","index$":1}, {"active":true,"entity":"deal","key$":"BasicDealFlow","kind":"basic","name":"BasicDealFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"deal_ref01"}}],"index$":0}]}, 'Deal', {"GET /deals":{"protocol":"http","operationId":"getDeals","responses":{"200":{"description":"Successful response with list of deals","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"internalName":{"type":"string","description":"Internal name of the game","key$":"internalName"},"title":{"type":"string","description":"Title of the game","key$":"title"},"metacriticLink":{"type":"string","description":"Link to Metacritic page","key$":"metacriticLink"},"dealID":{"type":"string","description":"Unique identifier for the deal","key$":"dealID"},"storeID":{"type":"string","description":"Store identifier","key$":"storeID"},"gameID":{"type":"string","description":"Game identifier","key$":"gameID"},"salePrice":{"type":"string","description":"Current sale price","key$":"salePrice"},"normalPrice":{"type":"string","description":"Regular price","key$":"normalPrice"},"isOnSale":{"type":"string","description":"Whether the game is on sale (0 or 1)","key$":"isOnSale"},"savings":{"type":"string","description":"Percentage savings","key$":"savings"},"metacriticScore":{"type":"string","description":"Metacritic score","key$":"metacriticScore"},"steamRatingText":{"type":"string","description":"Steam rating description","key$":"steamRatingText"},"steamRatingPercent":{"type":"string","description":"Steam rating percentage","key$":"steamRatingPercent"},"steamRatingCount":{"type":"string","description":"Number of Steam ratings","key$":"steamRatingCount"},"steamAppID":{"type":"string","description":"Steam App ID","key$":"steamAppID"},"releaseDate":{"type":"integer","description":"Unix timestamp of release date","key$":"releaseDate"},"lastChange":{"type":"integer","description":"Unix timestamp of last price change","key$":"lastChange"},"dealRating":{"type":"string","description":"Rating of the deal","key$":"dealRating"},"thumb":{"type":"string","description":"Thumbnail image URL","key$":"thumb"}},"x-ref":"#/components/schemas/Deal","index$":0}}}}},"400":{"description":"Bad request - invalid parameters"}},"parameters":[{"name":"storeID","in":"query","description":"Filter deals by store ID","required":false,"schema":{"type":"integer"},"index$":0},{"name":"pageNumber","in":"query","description":"Page number for pagination (default: 0)","required":false,"schema":{"type":"integer","default":0},"index$":1},{"name":"pageSize","in":"query","description":"Number of deals per page (default: 60, max: 60)","required":false,"schema":{"type":"integer","default":60,"maximum":60},"index$":2},{"name":"sortBy","in":"query","description":"Sort deals by criteria","required":false,"schema":{"type":"string","enum":["Deal Rating","Title","Savings","Price","Metacritic","Reviews","Release","Store","recent"]},"index$":3},{"name":"desc","in":"query","description":"Sort in descending order (0 = ascending, 1 = descending)","required":false,"schema":{"type":"integer","enum":[0,1],"default":0},"index$":4},{"name":"lowerPrice","in":"query","description":"Minimum price for deals","required":false,"schema":{"type":"number","format":"float"},"index$":5},{"name":"upperPrice","in":"query","description":"Maximum price for deals","required":false,"schema":{"type":"number","format":"float"},"index$":6},{"name":"metacritic","in":"query","description":"Minimum Metacritic score","required":false,"schema":{"type":"integer","minimum":0,"maximum":100},"index$":7},{"name":"steamRating","in":"query","description":"Minimum Steam rating (0-100)","required":false,"schema":{"type":"integer","minimum":0,"maximum":100},"index$":8},{"name":"steamAppID","in":"query","description":"Filter by Steam App ID","required":false,"schema":{"type":"string"},"index$":9},{"name":"title","in":"query","description":"Search for deals by game title","required":false,"schema":{"type":"string"},"index$":10},{"name":"exact","in":"query","description":"Exact match for title search (0 = fuzzy, 1 = exact)","required":false,"schema":{"type":"integer","enum":[0,1],"default":0},"index$":11},{"name":"AAA","in":"query","description":"Filter for AAA titles (0 = all, 1 = AAA only)","required":false,"schema":{"type":"integer","enum":[0,1]},"index$":12},{"name":"steamworks","in":"query","description":"Filter for Steamworks games (0 = all, 1 = Steamworks only)","required":false,"schema":{"type":"integer","enum":[0,1]},"index$":13},{"name":"onSale","in":"query","description":"Filter for games on sale (0 = all, 1 = on sale only)","required":false,"schema":{"type":"integer","enum":[0,1]},"index$":14},{"name":"output","in":"query","description":"Output format (default: json)","required":false,"schema":{"type":"string","enum":["json","rss"]},"index$":15}],"securitySource":"unspecified"}})
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
  
