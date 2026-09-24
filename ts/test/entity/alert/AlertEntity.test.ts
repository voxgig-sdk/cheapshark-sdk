

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


describe('AlertEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CHEAPSHARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('CHEAPSHARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CheapsharkSDK.test()
    const ent = testsdk.Alert()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CHEAPSHARK_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'alert.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"sh":"Email address for the alert","t":"`$STRING`","key$":"email","index$":0},"gameID":{"a":true,"h":"Game Id","n":"gameID","r":false,"sh":"Game identifier","t":"`$STRING`","key$":"gameID","index$":1},"gameTitle":{"a":true,"h":"Game Title","n":"gameTitle","r":false,"sh":"Title of the game","t":"`$STRING`","key$":"gameTitle","index$":2},"price":{"a":true,"fo":"float","h":"Price","n":"price","r":false,"sh":"Target price for the alert","t":"`$NUMBER`","key$":"price","index$":3}},"name":"alert","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /alerts","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/alerts","q":{},"r":{},"s":[{"lit":"alerts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /alerts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"email","or":"email","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/alerts","q":{"exist":["email"]},"r":{},"s":[{"lit":"alerts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /alerts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"email","or":"email","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"game_id","or":"game_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/alerts","q":{"exist":["email","game_id"]},"r":{},"s":[{"lit":"alerts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"alert","name__orig":"alert","Name":"Alert","name_":"alert","name-":"alert","NAME":"ALERT","index$":0}, {"active":true,"entity":"alert","key$":"BasicAlertFlow","kind":"basic","name":"BasicAlertFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"alert_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"alert_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"alert_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"alert_ref01"}}],"index$":3}]}, 'Alert', {"POST /alerts":{"protocol":"http","operationId":"setAlert","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["email","gameID","price"],"properties":{"email":{"type":"string","format":"email","description":"Email address for the alert"},"gameID":{"type":"string","description":"Game ID to set alert for"},"price":{"type":"number","format":"float","description":"Target price for the alert"}}}}}},"responses":{"200":{"description":"Alert successfully set"},"400":{"description":"Bad request - invalid parameters"}},"parameters":[],"securitySource":"unspecified"},"GET /alerts":{"protocol":"http","operationId":"getAlerts","responses":{"200":{"description":"Successful response with list of alerts","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"gameID":{"type":"string","description":"Game identifier","key$":"gameID"},"gameTitle":{"type":"string","description":"Title of the game","key$":"gameTitle"},"price":{"type":"number","format":"float","description":"Target price for the alert","key$":"price"},"email":{"type":"string","format":"email","description":"Email address for the alert","key$":"email"}},"x-ref":"#/components/schemas/Alert","index$":0}}}}},"400":{"description":"Bad request - invalid email"}},"parameters":[{"name":"email","in":"query","description":"Email address to retrieve alerts for","required":true,"schema":{"type":"string","format":"email"},"index$":0}],"securitySource":"unspecified"},"DELETE /alerts":{"protocol":"http","operationId":"deleteAlert","responses":{"200":{"description":"Alert successfully deleted"},"400":{"description":"Bad request - invalid parameters"}},"parameters":[{"name":"email","in":"query","description":"Email address associated with the alert","required":true,"schema":{"type":"string","format":"email"},"index$":0},{"name":"gameID","in":"query","description":"Game ID of the alert to delete","required":true,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const alert_ref01_ent = client.Alert()
    let alert_ref01_data = setup.data.new.alert['alert_ref01']

    alert_ref01_data = (await alert_ref01_ent.create(alert_ref01_data)).data()
    assert(null != alert_ref01_data)


    // LIST
    const alert_ref01_match: any = {}

    const alert_ref01_list = (await alert_ref01_ent.list(alert_ref01_match)).map((e: any) => e.data())



    // LIST
    const alert_ref01_match_rt0: any = {}

    const alert_ref01_list_rt0 = (await alert_ref01_ent.list(alert_ref01_match_rt0)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/alert/AlertTestData.json')

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
    ['alert01','alert02','alert03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CHEAPSHARK_TEST_ALERT_ENTID': idmap,
    'CHEAPSHARK_TEST_LIVE': 'FALSE',
    'CHEAPSHARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CHEAPSHARK_TEST_ALERT_ENTID']

  const live = 'TRUE' === env.CHEAPSHARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CHEAPSHARK_TEST_ALERT_ENTID']
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
  
