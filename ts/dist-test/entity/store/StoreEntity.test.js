"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('StoreEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CHEAPSHARK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CHEAPSHARK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CheapsharkSDK.test();
        const ent = testsdk.Store();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CHEAPSHARK_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'store.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "images": { "a": true, "h": "Images", "n": "images", "r": false, "t": "`$OBJECT`", "key$": "images", "index$": 0 }, "isActive": { "a": true, "h": "Is Active", "n": "isActive", "r": false, "sh": "Whether the store is active (0 or 1)", "t": "`$INTEGER`", "key$": "isActive", "index$": 1 }, "storeID": { "a": true, "h": "Store Id", "n": "storeID", "r": false, "sh": "Unique store identifier", "t": "`$STRING`", "key$": "storeID", "index$": 2 }, "storeName": { "a": true, "h": "Store Name", "n": "storeName", "r": false, "sh": "Name of the store", "t": "`$STRING`", "key$": "storeName", "index$": 3 } }, "name": "store", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /stores", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/stores", "q": {}, "r": {}, "s": [{ "lit": "stores" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "store", "name__orig": "store", "Name": "Store", "name_": "store", "name-": "store", "NAME": "STORE", "index$": 3 }, { "active": true, "entity": "store", "key$": "BasicStoreFlow", "kind": "basic", "name": "BasicStoreFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "store_ref01" } }], "index$": 0 }] }, 'Store', { "GET /stores": { "protocol": "http", "operationId": "getStores", "responses": { "200": { "description": "Successful response with list of stores", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "storeID": { "type": "string", "description": "Unique store identifier", "key$": "storeID" }, "storeName": { "type": "string", "description": "Name of the store", "key$": "storeName" }, "isActive": { "type": "integer", "description": "Whether the store is active (0 or 1)", "key$": "isActive" }, "images": { "type": "object", "properties": { "banner": { "type": "string", "description": "Banner image URL" }, "logo": { "type": "string", "description": "Logo image URL" }, "icon": { "type": "string", "description": "Icon image URL" } }, "key$": "images" } }, "x-ref": "#/components/schemas/Store", "index$": 0 } } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let store_ref01_data = Object.values(setup.data.existing.store)[0];
        // LIST
        const store_ref01_ent = client.Store();
        const store_ref01_match = {};
        const store_ref01_list = (await store_ref01_ent.list(store_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/store/StoreTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CheapsharkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['store01', 'store02', 'store03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CHEAPSHARK_TEST_STORE_ENTID': idmap,
        'CHEAPSHARK_TEST_LIVE': 'FALSE',
        'CHEAPSHARK_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CHEAPSHARK_TEST_STORE_ENTID'];
    const live = 'TRUE' === env.CHEAPSHARK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CHEAPSHARK_TEST_STORE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CheapsharkSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=StoreEntity.test.js.map