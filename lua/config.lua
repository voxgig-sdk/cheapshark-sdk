-- Cheapshark SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Cheapshark",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://www.cheapshark.com/api/1.0",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["alert"] = {},
        ["deal"] = {},
        ["game"] = {},
        ["store"] = {},
      },
    },
    entity = {
      ["alert"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "gameID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "gameTitle",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "price",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "alert",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/alerts",
                ["parts"] = {
                  "alerts",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "email",
                      ["orig"] = "email",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/alerts",
                ["parts"] = {
                  "alerts",
                },
                ["select"] = {
                  ["exist"] = {
                    "email",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "email",
                      ["orig"] = "email",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "game_id",
                      ["orig"] = "game_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/alerts",
                ["parts"] = {
                  "alerts",
                },
                ["select"] = {
                  ["exist"] = {
                    "email",
                    "game_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["deal"] = {
        ["fields"] = {
          {
            ["name"] = "dealID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "dealRating",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "gameID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "internalName",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isOnSale",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lastChange",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "metacriticLink",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "metacriticScore",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "normalPrice",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "releaseDate",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "salePrice",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "savings",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "steamAppID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "steamRatingCount",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "steamRatingPercent",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "steamRatingText",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "storeID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "thumb",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "deal",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "aaa",
                      ["orig"] = "aaa",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "desc",
                      ["orig"] = "desc",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "exact",
                      ["orig"] = "exact",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lower_price",
                      ["orig"] = "lower_price",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "metacritic",
                      ["orig"] = "metacritic",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "on_sale",
                      ["orig"] = "on_sale",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "output",
                      ["orig"] = "output",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 60,
                      ["kind"] = "query",
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "sort_by",
                      ["orig"] = "sort_by",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "steam_app_id",
                      ["orig"] = "steam_app_id",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "steam_rating",
                      ["orig"] = "steam_rating",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "steamwork",
                      ["orig"] = "steamwork",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "store_id",
                      ["orig"] = "store_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "title",
                      ["orig"] = "title",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "upper_price",
                      ["orig"] = "upper_price",
                      ["type"] = "`$NUMBER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/deals",
                ["parts"] = {
                  "deals",
                },
                ["select"] = {
                  ["exist"] = {
                    "aaa",
                    "desc",
                    "exact",
                    "lower_price",
                    "metacritic",
                    "on_sale",
                    "output",
                    "page_number",
                    "page_size",
                    "sort_by",
                    "steam_app_id",
                    "steam_rating",
                    "steamwork",
                    "store_id",
                    "title",
                    "upper_price",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["game"] = {
        ["fields"] = {
          {
            ["name"] = "cheapest",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cheapestDealID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "external",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "gameID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "internalName",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "steamAppID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "thumb",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "game",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "exact",
                      ["orig"] = "exact",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 60,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "steam_app_id",
                      ["orig"] = "steam_app_id",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "title",
                      ["orig"] = "title",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/games",
                ["parts"] = {
                  "games",
                },
                ["select"] = {
                  ["exist"] = {
                    "exact",
                    "limit",
                    "steam_app_id",
                    "title",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["store"] = {
        ["fields"] = {
          {
            ["name"] = "images",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "isActive",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "storeID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "storeName",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "store",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/stores",
                ["parts"] = {
                  "stores",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
