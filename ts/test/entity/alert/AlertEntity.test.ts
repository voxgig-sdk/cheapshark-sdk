
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { CheapsharkSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'alert.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set CHEAPSHARK_TEST_ALERT_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const alert_ref01_ent = client.Alert()
    let alert_ref01_data = setup.data.new.alert['alert_ref01']

    alert_ref01_data = await alert_ref01_ent.create(alert_ref01_data)
    assert(null != alert_ref01_data)


    // LIST
    const alert_ref01_match: any = {}

    const alert_ref01_list = await alert_ref01_ent.list(alert_ref01_match)

    assert(!isempty(select(alert_ref01_list, { id: alert_ref01_data.id })))


    // REMOVE
    const alert_ref01_match_rm0: any = { id: alert_ref01_data.id }
    await alert_ref01_ent.remove(alert_ref01_match_rm0)
  

    // LIST
    const alert_ref01_match_rt0: any = {}

    const alert_ref01_list_rt0 = await alert_ref01_ent.list(alert_ref01_match_rt0)

    assert(isempty(select(alert_ref01_list_rt0, { id: alert_ref01_data.id })))


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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['CHEAPSHARK_TEST_ALERT_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'CHEAPSHARK_TEST_ALERT_ENTID': idmap,
    'CHEAPSHARK_TEST_LIVE': 'FALSE',
    'CHEAPSHARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CHEAPSHARK_TEST_ALERT_ENTID']

  const live = 'TRUE' === env.CHEAPSHARK_TEST_LIVE

  if (live) {
    client = new CheapsharkSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
