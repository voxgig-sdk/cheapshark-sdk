"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Cheapshark',
        slug: "cheapshark",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://www.cheapshark.com/api/1.0",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            deal: {},
            game: {},
            store: {},
        }
    };
    entity = {
        "deal": {
            "fields": [
                {
                    "name": "dealID",
                    "title": "Deal Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for the deal"
                },
                {
                    "name": "dealRating",
                    "title": "Deal Rating",
                    "type": "`$STRING`",
                    "short": "Rating of the deal"
                },
                {
                    "name": "gameID",
                    "title": "Game Id",
                    "type": "`$STRING`",
                    "short": "Game identifier"
                },
                {
                    "name": "internalName",
                    "title": "Internal Name",
                    "type": "`$STRING`",
                    "short": "Internal name of the game"
                },
                {
                    "name": "isOnSale",
                    "title": "Is On Sale",
                    "type": "`$STRING`",
                    "short": "Whether the game is on sale (0 or 1)"
                },
                {
                    "name": "lastChange",
                    "title": "Last Change",
                    "type": "`$INTEGER`",
                    "short": "Unix timestamp of last price change"
                },
                {
                    "name": "metacriticLink",
                    "title": "Metacritic Link",
                    "type": "`$STRING`",
                    "short": "Link to Metacritic page"
                },
                {
                    "name": "metacriticScore",
                    "title": "Metacritic Score",
                    "type": "`$STRING`",
                    "short": "Metacritic score"
                },
                {
                    "name": "normalPrice",
                    "title": "Normal Price",
                    "type": "`$STRING`",
                    "short": "Regular price"
                },
                {
                    "name": "releaseDate",
                    "title": "Release Date",
                    "type": "`$INTEGER`",
                    "short": "Unix timestamp of release date"
                },
                {
                    "name": "salePrice",
                    "title": "Sale Price",
                    "type": "`$STRING`",
                    "short": "Current sale price"
                },
                {
                    "name": "savings",
                    "title": "Savings",
                    "type": "`$STRING`",
                    "short": "Percentage savings"
                },
                {
                    "name": "steamAppID",
                    "title": "Steam App Id",
                    "type": "`$STRING`",
                    "short": "Steam App ID"
                },
                {
                    "name": "steamRatingCount",
                    "title": "Steam Rating Count",
                    "type": "`$STRING`",
                    "short": "Number of Steam ratings"
                },
                {
                    "name": "steamRatingPercent",
                    "title": "Steam Rating Percent",
                    "type": "`$STRING`",
                    "short": "Steam rating percentage"
                },
                {
                    "name": "steamRatingText",
                    "title": "Steam Rating Text",
                    "type": "`$STRING`",
                    "short": "Steam rating description"
                },
                {
                    "name": "storeID",
                    "title": "Store Id",
                    "type": "`$STRING`",
                    "short": "Store identifier"
                },
                {
                    "name": "thumb",
                    "title": "Thumb",
                    "type": "`$STRING`",
                    "short": "Thumbnail image URL"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "short": "Title of the game"
                }
            ],
            "name": "deal",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deals",
                            "segments": [
                                {
                                    "lit": "deals"
                                }
                            ],
                            "parts": [
                                "deals"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "aaa",
                                        "orig": "AAA",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "desc",
                                        "orig": "desc",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "exact",
                                        "orig": "exact",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "lower_price",
                                        "orig": "lowerPrice",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "metacritic",
                                        "orig": "metacritic",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "on_sale",
                                        "orig": "onSale",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "output",
                                        "orig": "output",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page_number",
                                        "orig": "pageNumber",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "pageSize",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 60
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sortBy",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "steam_app_id",
                                        "orig": "steamAppID",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "steam_rating",
                                        "orig": "steamRating",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "steamwork",
                                        "orig": "steamworks",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "store_id",
                                        "orig": "storeID",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "title",
                                        "orig": "title",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "upper_price",
                                        "orig": "upperPrice",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "game": {
            "fields": [
                {
                    "name": "cheapest",
                    "title": "Cheapest",
                    "type": "`$STRING`",
                    "short": "Lowest price found"
                },
                {
                    "name": "cheapestDealID",
                    "title": "Cheapest Deal Id",
                    "type": "`$STRING`",
                    "short": "Deal ID for the cheapest price"
                },
                {
                    "name": "external",
                    "title": "External",
                    "type": "`$STRING`",
                    "short": "External game title"
                },
                {
                    "name": "gameID",
                    "title": "Game Id",
                    "type": "`$STRING`",
                    "short": "Unique game identifier"
                },
                {
                    "name": "internalName",
                    "title": "Internal Name",
                    "type": "`$STRING`",
                    "short": "Internal game name"
                },
                {
                    "name": "steamAppID",
                    "title": "Steam App Id",
                    "type": "`$STRING`",
                    "short": "Steam App ID"
                },
                {
                    "name": "thumb",
                    "title": "Thumb",
                    "type": "`$STRING`",
                    "short": "Thumbnail image URL"
                }
            ],
            "name": "game",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/games",
                            "segments": [
                                {
                                    "lit": "games"
                                }
                            ],
                            "parts": [
                                "games"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "exact",
                                        "orig": "exact",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 60
                                    },
                                    {
                                        "name": "steam_app_id",
                                        "orig": "steamAppID",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "title",
                                        "orig": "title",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "batman"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "title"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "store": {
            "fields": [
                {
                    "name": "images",
                    "title": "Images",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "isActive",
                    "title": "Is Active",
                    "type": "`$INTEGER`",
                    "short": "Whether the store is active (0 or 1)"
                },
                {
                    "name": "storeID",
                    "title": "Store Id",
                    "type": "`$STRING`",
                    "short": "Unique store identifier"
                },
                {
                    "name": "storeName",
                    "title": "Store Name",
                    "type": "`$STRING`",
                    "short": "Name of the store"
                }
            ],
            "name": "store",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/stores",
                            "segments": [
                                {
                                    "lit": "stores"
                                }
                            ],
                            "parts": [
                                "stores"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map