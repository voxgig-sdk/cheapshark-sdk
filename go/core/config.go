package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Cheapshark",
			"slug": "cheapshark",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://www.cheapshark.com/api/1.0",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"alert": map[string]any{},
				"deal": map[string]any{},
				"game": map[string]any{},
				"store": map[string]any{},
			},
		},
		"entity": map[string]any{
			"alert": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "Email address for the alert",
						"format": "email",
					},
					map[string]any{
						"name": "gameID",
						"title": "Game Id",
						"type": "`$STRING`",
						"short": "Game identifier",
					},
					map[string]any{
						"name": "gameTitle",
						"title": "Game Title",
						"type": "`$STRING`",
						"short": "Title of the game",
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$NUMBER`",
						"short": "Target price for the alert",
						"format": "float",
					},
				},
				"name": "alert",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/alerts",
								"segments": []any{
									map[string]any{
										"lit": "alerts",
									},
								},
								"parts": []any{
									"alerts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/alerts",
								"segments": []any{
									map[string]any{
										"lit": "alerts",
									},
								},
								"parts": []any{
									"alerts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"email",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/alerts",
								"segments": []any{
									map[string]any{
										"lit": "alerts",
									},
								},
								"parts": []any{
									"alerts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "game_id",
											"orig": "game_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"email",
										"game_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"deal": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dealID",
						"title": "Deal Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the deal",
					},
					map[string]any{
						"name": "dealRating",
						"title": "Deal Rating",
						"type": "`$STRING`",
						"short": "Rating of the deal",
					},
					map[string]any{
						"name": "gameID",
						"title": "Game Id",
						"type": "`$STRING`",
						"short": "Game identifier",
					},
					map[string]any{
						"name": "internalName",
						"title": "Internal Name",
						"type": "`$STRING`",
						"short": "Internal name of the game",
					},
					map[string]any{
						"name": "isOnSale",
						"title": "Is On Sale",
						"type": "`$STRING`",
						"short": "Whether the game is on sale (0 or 1)",
					},
					map[string]any{
						"name": "lastChange",
						"title": "Last Change",
						"type": "`$INTEGER`",
						"short": "Unix timestamp of last price change",
					},
					map[string]any{
						"name": "metacriticLink",
						"title": "Metacritic Link",
						"type": "`$STRING`",
						"short": "Link to Metacritic page",
					},
					map[string]any{
						"name": "metacriticScore",
						"title": "Metacritic Score",
						"type": "`$STRING`",
						"short": "Metacritic score",
					},
					map[string]any{
						"name": "normalPrice",
						"title": "Normal Price",
						"type": "`$STRING`",
						"short": "Regular price",
					},
					map[string]any{
						"name": "releaseDate",
						"title": "Release Date",
						"type": "`$INTEGER`",
						"short": "Unix timestamp of release date",
					},
					map[string]any{
						"name": "salePrice",
						"title": "Sale Price",
						"type": "`$STRING`",
						"short": "Current sale price",
					},
					map[string]any{
						"name": "savings",
						"title": "Savings",
						"type": "`$STRING`",
						"short": "Percentage savings",
					},
					map[string]any{
						"name": "steamAppID",
						"title": "Steam App Id",
						"type": "`$STRING`",
						"short": "Steam App ID",
					},
					map[string]any{
						"name": "steamRatingCount",
						"title": "Steam Rating Count",
						"type": "`$STRING`",
						"short": "Number of Steam ratings",
					},
					map[string]any{
						"name": "steamRatingPercent",
						"title": "Steam Rating Percent",
						"type": "`$STRING`",
						"short": "Steam rating percentage",
					},
					map[string]any{
						"name": "steamRatingText",
						"title": "Steam Rating Text",
						"type": "`$STRING`",
						"short": "Steam rating description",
					},
					map[string]any{
						"name": "storeID",
						"title": "Store Id",
						"type": "`$STRING`",
						"short": "Store identifier",
					},
					map[string]any{
						"name": "thumb",
						"title": "Thumb",
						"type": "`$STRING`",
						"short": "Thumbnail image URL",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Title of the game",
					},
				},
				"name": "deal",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/deals",
								"segments": []any{
									map[string]any{
										"lit": "deals",
									},
								},
								"parts": []any{
									"deals",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "aaa",
											"orig": "aaa",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "desc",
											"orig": "desc",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "exact",
											"orig": "exact",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "lower_price",
											"orig": "lower_price",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "metacritic",
											"orig": "metacritic",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "on_sale",
											"orig": "on_sale",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "output",
											"orig": "output",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 60,
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "steam_app_id",
											"orig": "steam_app_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "steam_rating",
											"orig": "steam_rating",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "steamwork",
											"orig": "steamwork",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "store_id",
											"orig": "store_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "title",
											"orig": "title",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "upper_price",
											"orig": "upper_price",
											"type": "`$NUMBER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"game": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cheapest",
						"title": "Cheapest",
						"type": "`$STRING`",
						"short": "Lowest price found",
					},
					map[string]any{
						"name": "cheapestDealID",
						"title": "Cheapest Deal Id",
						"type": "`$STRING`",
						"short": "Deal ID for the cheapest price",
					},
					map[string]any{
						"name": "external",
						"title": "External",
						"type": "`$STRING`",
						"short": "External game title",
					},
					map[string]any{
						"name": "gameID",
						"title": "Game Id",
						"type": "`$STRING`",
						"short": "Unique game identifier",
					},
					map[string]any{
						"name": "internalName",
						"title": "Internal Name",
						"type": "`$STRING`",
						"short": "Internal game name",
					},
					map[string]any{
						"name": "steamAppID",
						"title": "Steam App Id",
						"type": "`$STRING`",
						"short": "Steam App ID",
					},
					map[string]any{
						"name": "thumb",
						"title": "Thumb",
						"type": "`$STRING`",
						"short": "Thumbnail image URL",
					},
				},
				"name": "game",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/games",
								"segments": []any{
									map[string]any{
										"lit": "games",
									},
								},
								"parts": []any{
									"games",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "exact",
											"orig": "exact",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 60,
										},
										map[string]any{
											"name": "steam_app_id",
											"orig": "steam_app_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "title",
											"orig": "title",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"exact",
										"limit",
										"steam_app_id",
										"title",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"store": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "images",
						"title": "Images",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "isActive",
						"title": "Is Active",
						"type": "`$INTEGER`",
						"short": "Whether the store is active (0 or 1)",
					},
					map[string]any{
						"name": "storeID",
						"title": "Store Id",
						"type": "`$STRING`",
						"short": "Unique store identifier",
					},
					map[string]any{
						"name": "storeName",
						"title": "Store Name",
						"type": "`$STRING`",
						"short": "Name of the store",
					},
				},
				"name": "store",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/stores",
								"segments": []any{
									map[string]any{
										"lit": "stores",
									},
								},
								"parts": []any{
									"stores",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
