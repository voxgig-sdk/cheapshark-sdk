// Typed models for the Cheapshark SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Alert {
  email?: string
  game_id?: string
  game_title?: string
  price?: number
}

export interface AlertListMatch {
  email?: string
  game_id?: string
  game_title?: string
  price?: number
}

export interface AlertCreateData {
  email?: string
  game_id?: string
  game_title?: string
  price?: number
}

export interface AlertRemoveMatch {
  email?: string
  game_id?: string
  game_title?: string
  price?: number
}

export interface Deal {
  deal_id?: string
  deal_rating?: string
  game_id?: string
  internal_name?: string
  is_on_sale?: boolean
  last_change?: number
  metacritic_link?: string
  metacritic_score?: string
  normal_price?: string
  release_date?: number
  sale_price?: string
  saving?: string
  steam_app_id?: string
  steam_rating_count?: string
  steam_rating_percent?: string
  steam_rating_text?: string
  store_id?: string
  thumb?: string
  title?: string
}

export interface DealListMatch {
  deal_id?: string
  deal_rating?: string
  game_id?: string
  internal_name?: string
  is_on_sale?: boolean
  last_change?: number
  metacritic_link?: string
  metacritic_score?: string
  normal_price?: string
  release_date?: number
  sale_price?: string
  saving?: string
  steam_app_id?: string
  steam_rating_count?: string
  steam_rating_percent?: string
  steam_rating_text?: string
  store_id?: string
  thumb?: string
  title?: string
}

export interface Game {
  cheapest?: string
  cheapest_deal_id?: string
  external?: string
  game_id?: string
  internal_name?: string
  steam_app_id?: string
  thumb?: string
}

export interface GameListMatch {
  cheapest?: string
  cheapest_deal_id?: string
  external?: string
  game_id?: string
  internal_name?: string
  steam_app_id?: string
  thumb?: string
}

export interface Store {
  image?: Record<string, any>
  is_active?: number
  store_id?: string
  store_name?: string
}

export interface StoreListMatch {
  image?: Record<string, any>
  is_active?: number
  store_id?: string
  store_name?: string
}

