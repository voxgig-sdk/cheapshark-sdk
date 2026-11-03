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
        "entity": "deal",
        "accessor": "Deal",
        "op": "list",
        "method": "GET",
        "path": "/deals",
        "args": [],
        "select": {
            "aaa": "v1",
            "desc": 0,
            "exact": 0,
            "lower_price": "v1",
            "metacritic": "v1",
            "on_sale": "v1",
            "output": "v1",
            "page_number": 0,
            "page_size": 60,
            "sort_by": "v1",
            "steam_app_id": "v1",
            "steam_rating": "v1",
            "steamwork": "v1",
            "store_id": "v1",
            "title": "v1",
            "upper_price": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
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
        "queryArgs": [
            {
                "name": "aaa",
                "wire": "AAA"
            },
            {
                "name": "desc",
                "wire": "desc"
            },
            {
                "name": "exact",
                "wire": "exact"
            },
            {
                "name": "lower_price",
                "wire": "lowerPrice"
            },
            {
                "name": "metacritic",
                "wire": "metacritic"
            },
            {
                "name": "on_sale",
                "wire": "onSale"
            },
            {
                "name": "output",
                "wire": "output"
            },
            {
                "name": "page_number",
                "wire": "pageNumber"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            },
            {
                "name": "sort_by",
                "wire": "sortBy"
            },
            {
                "name": "steam_app_id",
                "wire": "steamAppID"
            },
            {
                "name": "steam_rating",
                "wire": "steamRating"
            },
            {
                "name": "steamwork",
                "wire": "steamworks"
            },
            {
                "name": "store_id",
                "wire": "storeID"
            },
            {
                "name": "title",
                "wire": "title"
            },
            {
                "name": "upper_price",
                "wire": "upperPrice"
            }
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
            "title": "batman",
            "exact": 0,
            "limit": 60,
            "steam_app_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "title",
            "steamAppID",
            "limit",
            "exact"
        ],
        "queryArgs": [
            {
                "name": "exact",
                "wire": "exact"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "steam_app_id",
                "wire": "steamAppID"
            },
            {
                "name": "title",
                "wire": "title"
            }
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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