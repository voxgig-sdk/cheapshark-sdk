

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"email","name":"email","req":false,"short":"Email address for the alert","type":"`$STRING`","index$":0},{"active":true,"name":"gameID","req":false,"short":"Game identifier","type":"`$STRING`","index$":1},{"active":true,"name":"gameTitle","req":false,"short":"Title of the game","type":"`$STRING`","index$":2},{"active":true,"format":"float","name":"price","req":false,"short":"Target price for the alert","type":"`$NUMBER`","index$":3}],"name":"alert","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /alerts","json":"{\"operationId\":\"setAlert\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"email\":{\"description\":\"Email address for the alert\",\"format\":\"email\",\"type\":\"string\"},\"gameID\":{\"description\":\"Game ID to set alert for\",\"type\":\"string\"},\"price\":{\"description\":\"Target price for the alert\",\"format\":\"float\",\"type\":\"number\"}},\"required\":[\"email\",\"gameID\",\"price\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"description\":\"Alert successfully set\"},\"400\":{\"description\":\"Bad request - invalid parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/alerts","segments":[{"lit":"alerts"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"email","orig":"email","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /alerts","json":"{\"operationId\":\"getAlerts\",\"parameters\":[{\"description\":\"Email address to retrieve alerts for\",\"in\":\"query\",\"name\":\"email\",\"required\":true,\"schema\":{\"format\":\"email\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"email\":{\"description\":\"Email address for the alert\",\"format\":\"email\",\"type\":\"string\"},\"gameID\":{\"description\":\"Game identifier\",\"type\":\"string\"},\"gameTitle\":{\"description\":\"Title of the game\",\"type\":\"string\"},\"price\":{\"description\":\"Target price for the alert\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of alerts\"},\"400\":{\"description\":\"Bad request - invalid email\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/alerts","segments":[{"lit":"alerts"}],"select":{"exist":["email"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"email","orig":"email","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"game_id","orig":"game_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"DELETE /alerts","json":"{\"operationId\":\"deleteAlert\",\"parameters\":[{\"description\":\"Email address associated with the alert\",\"in\":\"query\",\"name\":\"email\",\"required\":true,\"schema\":{\"format\":\"email\",\"type\":\"string\"}},{\"description\":\"Game ID of the alert to delete\",\"in\":\"query\",\"name\":\"gameID\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Alert successfully deleted\"},\"400\":{\"description\":\"Bad request - invalid parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/alerts","segments":[{"lit":"alerts"}],"select":{"exist":["email","game_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"alert","name__orig":"alert","Name":"Alert","name_":"alert","name-":"alert","NAME":"ALERT","index$":0}, {"active":true,"entity":"alert","key$":"BasicAlertFlow","kind":"basic","name":"BasicAlertFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"alert_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"alert_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"alert_ref01","suffix":"_rm0"},"match":{},"op":"remove","spec":[],"valid":[],"index$":2},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"alert_ref01"}}],"index$":3}]}, 'Alert')
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
  
