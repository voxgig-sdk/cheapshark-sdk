-- Typed models for the Cheapshark SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Alert
---@field email? string
---@field game_id? string
---@field game_title? string
---@field price? number

---@class AlertListMatch
---@field email? string
---@field game_id? string
---@field game_title? string
---@field price? number

---@class AlertCreateData
---@field email? string
---@field game_id? string
---@field game_title? string
---@field price? number

---@class AlertRemoveMatch
---@field email? string
---@field game_id? string
---@field game_title? string
---@field price? number

---@class Deal
---@field deal_id? string
---@field deal_rating? string
---@field game_id? string
---@field internal_name? string
---@field is_on_sale? boolean
---@field last_change? number
---@field metacritic_link? string
---@field metacritic_score? string
---@field normal_price? string
---@field release_date? number
---@field sale_price? string
---@field saving? string
---@field steam_app_id? string
---@field steam_rating_count? string
---@field steam_rating_percent? string
---@field steam_rating_text? string
---@field store_id? string
---@field thumb? string
---@field title? string

---@class DealListMatch
---@field deal_id? string
---@field deal_rating? string
---@field game_id? string
---@field internal_name? string
---@field is_on_sale? boolean
---@field last_change? number
---@field metacritic_link? string
---@field metacritic_score? string
---@field normal_price? string
---@field release_date? number
---@field sale_price? string
---@field saving? string
---@field steam_app_id? string
---@field steam_rating_count? string
---@field steam_rating_percent? string
---@field steam_rating_text? string
---@field store_id? string
---@field thumb? string
---@field title? string

---@class Game
---@field cheapest? string
---@field cheapest_deal_id? string
---@field external? string
---@field game_id? string
---@field internal_name? string
---@field steam_app_id? string
---@field thumb? string

---@class GameListMatch
---@field cheapest? string
---@field cheapest_deal_id? string
---@field external? string
---@field game_id? string
---@field internal_name? string
---@field steam_app_id? string
---@field thumb? string

---@class Store
---@field image? table
---@field is_active? number
---@field store_id? string
---@field store_name? string

---@class StoreListMatch
---@field image? table
---@field is_active? number
---@field store_id? string
---@field store_name? string

local M = {}

return M
