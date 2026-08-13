// Typed models for the Cheapshark SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/cheapshark-sdk/go/core"
)

// Alert is the typed data model for the alert entity.
type Alert struct {
	Email *string `json:"email,omitempty"`
	GameID *string `json:"gameID,omitempty"`
	GameTitle *string `json:"gameTitle,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// AlertListMatch is the typed request payload for Alert.ListTyped.
type AlertListMatch struct {
	Email *string `json:"email,omitempty"`
	GameID *string `json:"gameID,omitempty"`
	GameTitle *string `json:"gameTitle,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// AlertCreateData is the typed request payload for Alert.CreateTyped.
type AlertCreateData struct {
	Email *string `json:"email,omitempty"`
	GameID *string `json:"gameID,omitempty"`
	GameTitle *string `json:"gameTitle,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// AlertRemoveMatch is the typed request payload for Alert.RemoveTyped.
type AlertRemoveMatch struct {
	Email *string `json:"email,omitempty"`
	GameID *string `json:"gameID,omitempty"`
	GameTitle *string `json:"gameTitle,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// Deal is the typed data model for the deal entity.
type Deal struct {
	DealID *string `json:"dealID,omitempty"`
	DealRating *string `json:"dealRating,omitempty"`
	GameID *string `json:"gameID,omitempty"`
	InternalName *string `json:"internalName,omitempty"`
	IsOnSale *string `json:"isOnSale,omitempty"`
	LastChange *int `json:"lastChange,omitempty"`
	MetacriticLink *string `json:"metacriticLink,omitempty"`
	MetacriticScore *string `json:"metacriticScore,omitempty"`
	NormalPrice *string `json:"normalPrice,omitempty"`
	ReleaseDate *int `json:"releaseDate,omitempty"`
	SalePrice *string `json:"salePrice,omitempty"`
	Savings *string `json:"savings,omitempty"`
	SteamAppID *string `json:"steamAppID,omitempty"`
	SteamRatingCount *string `json:"steamRatingCount,omitempty"`
	SteamRatingPercent *string `json:"steamRatingPercent,omitempty"`
	SteamRatingText *string `json:"steamRatingText,omitempty"`
	StoreID *string `json:"storeID,omitempty"`
	Thumb *string `json:"thumb,omitempty"`
	Title *string `json:"title,omitempty"`
}

// DealListMatch is the typed request payload for Deal.ListTyped.
type DealListMatch struct {
	DealID *string `json:"dealID,omitempty"`
	DealRating *string `json:"dealRating,omitempty"`
	GameID *string `json:"gameID,omitempty"`
	InternalName *string `json:"internalName,omitempty"`
	IsOnSale *string `json:"isOnSale,omitempty"`
	LastChange *int `json:"lastChange,omitempty"`
	MetacriticLink *string `json:"metacriticLink,omitempty"`
	MetacriticScore *string `json:"metacriticScore,omitempty"`
	NormalPrice *string `json:"normalPrice,omitempty"`
	ReleaseDate *int `json:"releaseDate,omitempty"`
	SalePrice *string `json:"salePrice,omitempty"`
	Savings *string `json:"savings,omitempty"`
	SteamAppID *string `json:"steamAppID,omitempty"`
	SteamRatingCount *string `json:"steamRatingCount,omitempty"`
	SteamRatingPercent *string `json:"steamRatingPercent,omitempty"`
	SteamRatingText *string `json:"steamRatingText,omitempty"`
	StoreID *string `json:"storeID,omitempty"`
	Thumb *string `json:"thumb,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Game is the typed data model for the game entity.
type Game struct {
	Cheapest *string `json:"cheapest,omitempty"`
	CheapestDealID *string `json:"cheapestDealID,omitempty"`
	External *string `json:"external,omitempty"`
	GameID *string `json:"gameID,omitempty"`
	InternalName *string `json:"internalName,omitempty"`
	SteamAppID *string `json:"steamAppID,omitempty"`
	Thumb *string `json:"thumb,omitempty"`
}

// GameListMatch is the typed request payload for Game.ListTyped.
type GameListMatch struct {
	Cheapest *string `json:"cheapest,omitempty"`
	CheapestDealID *string `json:"cheapestDealID,omitempty"`
	External *string `json:"external,omitempty"`
	GameID *string `json:"gameID,omitempty"`
	InternalName *string `json:"internalName,omitempty"`
	SteamAppID *string `json:"steamAppID,omitempty"`
	Thumb *string `json:"thumb,omitempty"`
}

// Store is the typed data model for the store entity.
type Store struct {
	Images *map[string]any `json:"images,omitempty"`
	IsActive *int `json:"isActive,omitempty"`
	StoreID *string `json:"storeID,omitempty"`
	StoreName *string `json:"storeName,omitempty"`
}

// StoreListMatch is the typed request payload for Store.ListTyped.
type StoreListMatch struct {
	Images *map[string]any `json:"images,omitempty"`
	IsActive *int `json:"isActive,omitempty"`
	StoreID *string `json:"storeID,omitempty"`
	StoreName *string `json:"storeName,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
