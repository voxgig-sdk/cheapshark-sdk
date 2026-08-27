// Typed models for the Cheapshark SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Alert {
  email?: string
  gameID?: string
  gameTitle?: string
  price?: number
}

export interface AlertListMatch {
  email: string
}

export interface AlertCreateData {
  email?: string
  gameID?: string
  gameTitle?: string
  price?: number
}

export interface AlertRemoveMatch {
  email: string
  game_id: string
}

export interface Deal {
  dealID?: string
  dealRating?: string
  gameID?: string
  internalName?: string
  isOnSale?: string
  lastChange?: number
  metacriticLink?: string
  metacriticScore?: string
  normalPrice?: string
  releaseDate?: number
  salePrice?: string
  savings?: string
  steamAppID?: string
  steamRatingCount?: string
  steamRatingPercent?: string
  steamRatingText?: string
  storeID?: string
  thumb?: string
  title?: string
}

export interface DealListMatch {
  aaa?: number
  desc?: number
  exact?: number
  lower_price?: number
  metacritic?: number
  on_sale?: number
  output?: string
  page_number?: number
  page_size?: number
  sort_by?: string
  steam_app_id?: string
  steam_rating?: number
  steamwork?: number
  store_id?: number
  title?: string
  upper_price?: number
}

export interface Game {
  cheapest?: string
  cheapestDealID?: string
  external?: string
  gameID?: string
  internalName?: string
  steamAppID?: string
  thumb?: string
}

export interface GameListMatch {
  exact?: number
  limit?: number
  steam_app_id?: string
  title?: string
}

export interface Store {
  images?: Record<string, any>
  isActive?: number
  storeID?: string
  storeName?: string
}

export interface StoreListMatch {
  images?: Record<string, any>
  isActive?: number
  storeID?: string
  storeName?: string
}

