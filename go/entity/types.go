// Typed models for the Cheapshark SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Alert is the typed data model for the alert entity.
type Alert struct {
	Email *string `json:"email,omitempty"`
	GameId *string `json:"game_id,omitempty"`
	GameTitle *string `json:"game_title,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// AlertListMatch mirrors the alert fields as an all-optional match
// filter (Go analog of Partial<Alert>).
type AlertListMatch struct {
	Email *string `json:"email,omitempty"`
	GameId *string `json:"game_id,omitempty"`
	GameTitle *string `json:"game_title,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// AlertCreateData mirrors the alert fields as an all-optional match
// filter (Go analog of Partial<Alert>).
type AlertCreateData struct {
	Email *string `json:"email,omitempty"`
	GameId *string `json:"game_id,omitempty"`
	GameTitle *string `json:"game_title,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// AlertRemoveMatch mirrors the alert fields as an all-optional match
// filter (Go analog of Partial<Alert>).
type AlertRemoveMatch struct {
	Email *string `json:"email,omitempty"`
	GameId *string `json:"game_id,omitempty"`
	GameTitle *string `json:"game_title,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// Deal is the typed data model for the deal entity.
type Deal struct {
	DealId *string `json:"deal_id,omitempty"`
	DealRating *string `json:"deal_rating,omitempty"`
	GameId *string `json:"game_id,omitempty"`
	InternalName *string `json:"internal_name,omitempty"`
	IsOnSale *bool `json:"is_on_sale,omitempty"`
	LastChange *int `json:"last_change,omitempty"`
	MetacriticLink *string `json:"metacritic_link,omitempty"`
	MetacriticScore *string `json:"metacritic_score,omitempty"`
	NormalPrice *string `json:"normal_price,omitempty"`
	ReleaseDate *int `json:"release_date,omitempty"`
	SalePrice *string `json:"sale_price,omitempty"`
	Saving *string `json:"saving,omitempty"`
	SteamAppId *string `json:"steam_app_id,omitempty"`
	SteamRatingCount *string `json:"steam_rating_count,omitempty"`
	SteamRatingPercent *string `json:"steam_rating_percent,omitempty"`
	SteamRatingText *string `json:"steam_rating_text,omitempty"`
	StoreId *string `json:"store_id,omitempty"`
	Thumb *string `json:"thumb,omitempty"`
	Title *string `json:"title,omitempty"`
}

// DealListMatch mirrors the deal fields as an all-optional match
// filter (Go analog of Partial<Deal>).
type DealListMatch struct {
	DealId *string `json:"deal_id,omitempty"`
	DealRating *string `json:"deal_rating,omitempty"`
	GameId *string `json:"game_id,omitempty"`
	InternalName *string `json:"internal_name,omitempty"`
	IsOnSale *bool `json:"is_on_sale,omitempty"`
	LastChange *int `json:"last_change,omitempty"`
	MetacriticLink *string `json:"metacritic_link,omitempty"`
	MetacriticScore *string `json:"metacritic_score,omitempty"`
	NormalPrice *string `json:"normal_price,omitempty"`
	ReleaseDate *int `json:"release_date,omitempty"`
	SalePrice *string `json:"sale_price,omitempty"`
	Saving *string `json:"saving,omitempty"`
	SteamAppId *string `json:"steam_app_id,omitempty"`
	SteamRatingCount *string `json:"steam_rating_count,omitempty"`
	SteamRatingPercent *string `json:"steam_rating_percent,omitempty"`
	SteamRatingText *string `json:"steam_rating_text,omitempty"`
	StoreId *string `json:"store_id,omitempty"`
	Thumb *string `json:"thumb,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Game is the typed data model for the game entity.
type Game struct {
	Cheapest *string `json:"cheapest,omitempty"`
	CheapestDealId *string `json:"cheapest_deal_id,omitempty"`
	External *string `json:"external,omitempty"`
	GameId *string `json:"game_id,omitempty"`
	InternalName *string `json:"internal_name,omitempty"`
	SteamAppId *string `json:"steam_app_id,omitempty"`
	Thumb *string `json:"thumb,omitempty"`
}

// GameListMatch mirrors the game fields as an all-optional match
// filter (Go analog of Partial<Game>).
type GameListMatch struct {
	Cheapest *string `json:"cheapest,omitempty"`
	CheapestDealId *string `json:"cheapest_deal_id,omitempty"`
	External *string `json:"external,omitempty"`
	GameId *string `json:"game_id,omitempty"`
	InternalName *string `json:"internal_name,omitempty"`
	SteamAppId *string `json:"steam_app_id,omitempty"`
	Thumb *string `json:"thumb,omitempty"`
}

// Store is the typed data model for the store entity.
type Store struct {
	Image *map[string]any `json:"image,omitempty"`
	IsActive *int `json:"is_active,omitempty"`
	StoreId *string `json:"store_id,omitempty"`
	StoreName *string `json:"store_name,omitempty"`
}

// StoreListMatch mirrors the store fields as an all-optional match
// filter (Go analog of Partial<Store>).
type StoreListMatch struct {
	Image *map[string]any `json:"image,omitempty"`
	IsActive *int `json:"is_active,omitempty"`
	StoreId *string `json:"store_id,omitempty"`
	StoreName *string `json:"store_name,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
