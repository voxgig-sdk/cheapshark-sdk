"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "alert",
        "accessor": "Alert",
        "op": "create",
        "method": "POST",
        "path": "/alerts",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "alert",
        "accessor": "Alert",
        "op": "list",
        "method": "GET",
        "path": "/alerts",
        "args": [],
        "select": {
            "email": "v1"
        },
        "headers": [],
        "query": [
            "email"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "gameID": "x",
                "gameTitle": "x",
                "price": 1,
                "email": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "alert",
        "accessor": "Alert",
        "op": "remove",
        "method": "DELETE",
        "path": "/alerts",
        "args": [],
        "select": {
            "email": "v1",
            "game_id": "v1"
        },
        "headers": [],
        "query": [
            "email",
            "gameID"
        ],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "deal",
        "accessor": "Deal",
        "op": "list",
        "method": "GET",
        "path": "/deals",
        "args": [],
        "select": {
            "aaa": "v1",
            "desc": "v1",
            "exact": "v1",
            "lower_price": "v1",
            "metacritic": "v1",
            "on_sale": "v1",
            "output": "v1",
            "page_number": "v1",
            "page_size": "v1",
            "sort_by": "v1",
            "steam_app_id": "v1",
            "steam_rating": "v1",
            "steamwork": "v1",
            "store_id": "v1",
            "title": "v1",
            "upper_price": "v1"
        },
        "headers": [],
        "query": [
            "storeID",
            "pageNumber",
            "pageSize",
            "sortBy",
            "desc",
            "lowerPrice",
            "upperPrice",
            "metacritic",
            "steamRating",
            "steamAppID",
            "title",
            "exact",
            "AAA",
            "steamworks",
            "onSale",
            "output"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "internalName": "x",
                "title": "x",
                "metacriticLink": "x",
                "dealID": "x",
                "storeID": "x",
                "gameID": "x",
                "salePrice": "x",
                "normalPrice": "x",
                "isOnSale": "x",
                "savings": "x",
                "metacriticScore": "x",
                "steamRatingText": "x",
                "steamRatingPercent": "x",
                "steamRatingCount": "x",
                "steamAppID": "x",
                "releaseDate": 1,
                "lastChange": 1,
                "dealRating": "x",
                "thumb": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "game",
        "accessor": "Game",
        "op": "list",
        "method": "GET",
        "path": "/games",
        "args": [],
        "select": {
            "exact": "v1",
            "limit": "v1",
            "steam_app_id": "v1",
            "title": "v1"
        },
        "headers": [],
        "query": [
            "title",
            "steamAppID",
            "limit",
            "exact"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "gameID": "x",
                "steamAppID": "x",
                "cheapest": "x",
                "cheapestDealID": "x",
                "external": "x",
                "internalName": "x",
                "thumb": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "store",
        "accessor": "Store",
        "op": "list",
        "method": "GET",
        "path": "/stores",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "storeID": "x",
                "storeName": "x",
                "isActive": 1,
                "images": {
                    "banner": "x",
                    "logo": "x",
                    "icon": "x"
                }
            }
        ],
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map