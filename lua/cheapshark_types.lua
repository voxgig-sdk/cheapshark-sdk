-- Typed models for the Cheapshark SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Alert
---@field email? string
---@field gameID? string
---@field gameTitle? string
---@field price? number

---@class AlertListMatch
---@field email? string
---@field gameID? string
---@field gameTitle? string
---@field price? number

---@class AlertCreateData
---@field email? string
---@field gameID? string
---@field gameTitle? string
---@field price? number

---@class AlertRemoveMatch
---@field email? string
---@field gameID? string
---@field gameTitle? string
---@field price? number

---@class Deal
---@field dealID? string
---@field dealRating? string
---@field gameID? string
---@field internalName? string
---@field isOnSale? string
---@field lastChange? number
---@field metacriticLink? string
---@field metacriticScore? string
---@field normalPrice? string
---@field releaseDate? number
---@field salePrice? string
---@field savings? string
---@field steamAppID? string
---@field steamRatingCount? string
---@field steamRatingPercent? string
---@field steamRatingText? string
---@field storeID? string
---@field thumb? string
---@field title? string

---@class DealListMatch
---@field dealID? string
---@field dealRating? string
---@field gameID? string
---@field internalName? string
---@field isOnSale? string
---@field lastChange? number
---@field metacriticLink? string
---@field metacriticScore? string
---@field normalPrice? string
---@field releaseDate? number
---@field salePrice? string
---@field savings? string
---@field steamAppID? string
---@field steamRatingCount? string
---@field steamRatingPercent? string
---@field steamRatingText? string
---@field storeID? string
---@field thumb? string
---@field title? string

---@class Game
---@field cheapest? string
---@field cheapestDealID? string
---@field external? string
---@field gameID? string
---@field internalName? string
---@field steamAppID? string
---@field thumb? string

---@class GameListMatch
---@field cheapest? string
---@field cheapestDealID? string
---@field external? string
---@field gameID? string
---@field internalName? string
---@field steamAppID? string
---@field thumb? string

---@class Store
---@field images? table
---@field isActive? number
---@field storeID? string
---@field storeName? string

---@class StoreListMatch
---@field images? table
---@field isActive? number
---@field storeID? string
---@field storeName? string

local M = {}

return M
