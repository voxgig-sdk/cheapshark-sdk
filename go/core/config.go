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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"short": "Email address for the alert",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gameID",
						"short": "Game identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gameTitle",
						"short": "Title of the game",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price",
						"short": "Target price for the alert",
						"type": "`$NUMBER`",
					},
				},
				"name": "alert",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/alerts",
								"parts": []any{
									"alerts",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "email",
											"orig": "email",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/alerts",
								"parts": []any{
									"alerts",
								},
								"select": map[string]any{
									"exist": []any{
										"email",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "email",
											"orig": "email",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "game_id",
											"orig": "game_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/alerts",
								"parts": []any{
									"alerts",
								},
								"select": map[string]any{
									"exist": []any{
										"email",
										"game_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"short": "Unique identifier for the deal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dealRating",
						"short": "Rating of the deal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gameID",
						"short": "Game identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "internalName",
						"short": "Internal name of the game",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isOnSale",
						"short": "Whether the game is on sale (0 or 1)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastChange",
						"short": "Unix timestamp of last price change",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "metacriticLink",
						"short": "Link to Metacritic page",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metacriticScore",
						"short": "Metacritic score",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "normalPrice",
						"short": "Regular price",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "releaseDate",
						"short": "Unix timestamp of release date",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "salePrice",
						"short": "Current sale price",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "savings",
						"short": "Percentage savings",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "steamAppID",
						"short": "Steam App ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "steamRatingCount",
						"short": "Number of Steam ratings",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "steamRatingPercent",
						"short": "Steam rating percentage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "steamRatingText",
						"short": "Steam rating description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "storeID",
						"short": "Store identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "thumb",
						"short": "Thumbnail image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the game",
						"type": "`$STRING`",
					},
				},
				"name": "deal",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "aaa",
											"orig": "aaa",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "desc",
											"orig": "desc",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "exact",
											"orig": "exact",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lower_price",
											"orig": "lower_price",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "metacritic",
											"orig": "metacritic",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "on_sale",
											"orig": "on_sale",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "output",
											"orig": "output",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 60,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "steam_app_id",
											"orig": "steam_app_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "steam_rating",
											"orig": "steam_rating",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "steamwork",
											"orig": "steamwork",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "store_id",
											"orig": "store_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "title",
											"orig": "title",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "upper_price",
											"orig": "upper_price",
											"type": "`$NUMBER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deals",
								"parts": []any{
									"deals",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"short": "Lowest price found",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cheapestDealID",
						"short": "Deal ID for the cheapest price",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "external",
						"short": "External game title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gameID",
						"short": "Unique game identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "internalName",
						"short": "Internal game name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "steamAppID",
						"short": "Steam App ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "thumb",
						"short": "Thumbnail image URL",
						"type": "`$STRING`",
					},
				},
				"name": "game",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "exact",
											"orig": "exact",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 60,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "steam_app_id",
											"orig": "steam_app_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "title",
											"orig": "title",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/games",
								"parts": []any{
									"games",
								},
								"select": map[string]any{
									"exist": []any{
										"exact",
										"limit",
										"steam_app_id",
										"title",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "isActive",
						"short": "Whether the store is active (0 or 1)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "storeID",
						"short": "Unique store identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "storeName",
						"short": "Name of the store",
						"type": "`$STRING`",
					},
				},
				"name": "store",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/stores",
								"parts": []any{
									"stores",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
