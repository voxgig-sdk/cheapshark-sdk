# Cheapshark SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Cheapshark",
            "slug": "cheapshark",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.cheapshark.com/api/1.0",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "deal": {},
                "game": {},
                "store": {},
            },
        },
        "entity": {
      "deal": {
        "fields": [
          {
            "name": "dealID",
            "title": "Deal Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the deal",
          },
          {
            "name": "dealRating",
            "title": "Deal Rating",
            "type": "`$STRING`",
            "short": "Rating of the deal",
          },
          {
            "name": "gameID",
            "title": "Game Id",
            "type": "`$STRING`",
            "short": "Game identifier",
          },
          {
            "name": "internalName",
            "title": "Internal Name",
            "type": "`$STRING`",
            "short": "Internal name of the game",
          },
          {
            "name": "isOnSale",
            "title": "Is On Sale",
            "type": "`$STRING`",
            "short": "Whether the game is on sale (0 or 1)",
          },
          {
            "name": "lastChange",
            "title": "Last Change",
            "type": "`$INTEGER`",
            "short": "Unix timestamp of last price change",
          },
          {
            "name": "metacriticLink",
            "title": "Metacritic Link",
            "type": "`$STRING`",
            "short": "Link to Metacritic page",
          },
          {
            "name": "metacriticScore",
            "title": "Metacritic Score",
            "type": "`$STRING`",
            "short": "Metacritic score",
          },
          {
            "name": "normalPrice",
            "title": "Normal Price",
            "type": "`$STRING`",
            "short": "Regular price",
          },
          {
            "name": "releaseDate",
            "title": "Release Date",
            "type": "`$INTEGER`",
            "short": "Unix timestamp of release date",
          },
          {
            "name": "salePrice",
            "title": "Sale Price",
            "type": "`$STRING`",
            "short": "Current sale price",
          },
          {
            "name": "savings",
            "title": "Savings",
            "type": "`$STRING`",
            "short": "Percentage savings",
          },
          {
            "name": "steamAppID",
            "title": "Steam App Id",
            "type": "`$STRING`",
            "short": "Steam App ID",
          },
          {
            "name": "steamRatingCount",
            "title": "Steam Rating Count",
            "type": "`$STRING`",
            "short": "Number of Steam ratings",
          },
          {
            "name": "steamRatingPercent",
            "title": "Steam Rating Percent",
            "type": "`$STRING`",
            "short": "Steam rating percentage",
          },
          {
            "name": "steamRatingText",
            "title": "Steam Rating Text",
            "type": "`$STRING`",
            "short": "Steam rating description",
          },
          {
            "name": "storeID",
            "title": "Store Id",
            "type": "`$STRING`",
            "short": "Store identifier",
          },
          {
            "name": "thumb",
            "title": "Thumb",
            "type": "`$STRING`",
            "short": "Thumbnail image URL",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "Title of the game",
          },
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
                    "lit": "deals",
                  },
                ],
                "parts": [
                  "deals",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "aaa",
                      "orig": "AAA",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "desc",
                      "orig": "desc",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "exact",
                      "orig": "exact",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "lower_price",
                      "orig": "lowerPrice",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "metacritic",
                      "orig": "metacritic",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "on_sale",
                      "orig": "onSale",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "output",
                      "orig": "output",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page_number",
                      "orig": "pageNumber",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "page_size",
                      "orig": "pageSize",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 60,
                    },
                    {
                      "name": "sort_by",
                      "orig": "sortBy",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "steam_app_id",
                      "orig": "steamAppID",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "steam_rating",
                      "orig": "steamRating",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "steamwork",
                      "orig": "steamworks",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "store_id",
                      "orig": "storeID",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "title",
                      "orig": "title",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "upper_price",
                      "orig": "upperPrice",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "game": {
        "fields": [
          {
            "name": "cheapest",
            "title": "Cheapest",
            "type": "`$STRING`",
            "short": "Lowest price found",
          },
          {
            "name": "cheapestDealID",
            "title": "Cheapest Deal Id",
            "type": "`$STRING`",
            "short": "Deal ID for the cheapest price",
          },
          {
            "name": "external",
            "title": "External",
            "type": "`$STRING`",
            "short": "External game title",
          },
          {
            "name": "gameID",
            "title": "Game Id",
            "type": "`$STRING`",
            "short": "Unique game identifier",
          },
          {
            "name": "internalName",
            "title": "Internal Name",
            "type": "`$STRING`",
            "short": "Internal game name",
          },
          {
            "name": "steamAppID",
            "title": "Steam App Id",
            "type": "`$STRING`",
            "short": "Steam App ID",
          },
          {
            "name": "thumb",
            "title": "Thumb",
            "type": "`$STRING`",
            "short": "Thumbnail image URL",
          },
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
                    "lit": "games",
                  },
                ],
                "parts": [
                  "games",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "exact",
                      "orig": "exact",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 60,
                    },
                    {
                      "name": "steam_app_id",
                      "orig": "steamAppID",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "title",
                      "orig": "title",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "batman",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "title",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "store": {
        "fields": [
          {
            "name": "images",
            "title": "Images",
            "type": "`$OBJECT`",
          },
          {
            "name": "isActive",
            "title": "Is Active",
            "type": "`$INTEGER`",
            "short": "Whether the store is active (0 or 1)",
          },
          {
            "name": "storeID",
            "title": "Store Id",
            "type": "`$STRING`",
            "short": "Unique store identifier",
          },
          {
            "name": "storeName",
            "title": "Store Name",
            "type": "`$STRING`",
            "short": "Name of the store",
          },
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
                    "lit": "stores",
                  },
                ],
                "parts": [
                  "stores",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
