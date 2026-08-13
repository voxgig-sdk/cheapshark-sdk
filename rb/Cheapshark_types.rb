# frozen_string_literal: true

# Typed models for the Cheapshark SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Alert entity data model.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] gameID
#   @return [String, nil]
#
# @!attribute [rw] gameTitle
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
Alert = Struct.new(
  :email,
  :gameID,
  :gameTitle,
  :price,
  keyword_init: true
)

# Request payload for Alert#list.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] gameID
#   @return [String, nil]
#
# @!attribute [rw] gameTitle
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
AlertListMatch = Struct.new(
  :email,
  :gameID,
  :gameTitle,
  :price,
  keyword_init: true
)

# Request payload for Alert#create.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] gameID
#   @return [String, nil]
#
# @!attribute [rw] gameTitle
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
AlertCreateData = Struct.new(
  :email,
  :gameID,
  :gameTitle,
  :price,
  keyword_init: true
)

# Request payload for Alert#remove.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] gameID
#   @return [String, nil]
#
# @!attribute [rw] gameTitle
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
AlertRemoveMatch = Struct.new(
  :email,
  :gameID,
  :gameTitle,
  :price,
  keyword_init: true
)

# Deal entity data model.
#
# @!attribute [rw] dealID
#   @return [String, nil]
#
# @!attribute [rw] dealRating
#   @return [String, nil]
#
# @!attribute [rw] gameID
#   @return [String, nil]
#
# @!attribute [rw] internalName
#   @return [String, nil]
#
# @!attribute [rw] isOnSale
#   @return [String, nil]
#
# @!attribute [rw] lastChange
#   @return [Integer, nil]
#
# @!attribute [rw] metacriticLink
#   @return [String, nil]
#
# @!attribute [rw] metacriticScore
#   @return [String, nil]
#
# @!attribute [rw] normalPrice
#   @return [String, nil]
#
# @!attribute [rw] releaseDate
#   @return [Integer, nil]
#
# @!attribute [rw] salePrice
#   @return [String, nil]
#
# @!attribute [rw] savings
#   @return [String, nil]
#
# @!attribute [rw] steamAppID
#   @return [String, nil]
#
# @!attribute [rw] steamRatingCount
#   @return [String, nil]
#
# @!attribute [rw] steamRatingPercent
#   @return [String, nil]
#
# @!attribute [rw] steamRatingText
#   @return [String, nil]
#
# @!attribute [rw] storeID
#   @return [String, nil]
#
# @!attribute [rw] thumb
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Deal = Struct.new(
  :dealID,
  :dealRating,
  :gameID,
  :internalName,
  :isOnSale,
  :lastChange,
  :metacriticLink,
  :metacriticScore,
  :normalPrice,
  :releaseDate,
  :salePrice,
  :savings,
  :steamAppID,
  :steamRatingCount,
  :steamRatingPercent,
  :steamRatingText,
  :storeID,
  :thumb,
  :title,
  keyword_init: true
)

# Request payload for Deal#list.
#
# @!attribute [rw] dealID
#   @return [String, nil]
#
# @!attribute [rw] dealRating
#   @return [String, nil]
#
# @!attribute [rw] gameID
#   @return [String, nil]
#
# @!attribute [rw] internalName
#   @return [String, nil]
#
# @!attribute [rw] isOnSale
#   @return [String, nil]
#
# @!attribute [rw] lastChange
#   @return [Integer, nil]
#
# @!attribute [rw] metacriticLink
#   @return [String, nil]
#
# @!attribute [rw] metacriticScore
#   @return [String, nil]
#
# @!attribute [rw] normalPrice
#   @return [String, nil]
#
# @!attribute [rw] releaseDate
#   @return [Integer, nil]
#
# @!attribute [rw] salePrice
#   @return [String, nil]
#
# @!attribute [rw] savings
#   @return [String, nil]
#
# @!attribute [rw] steamAppID
#   @return [String, nil]
#
# @!attribute [rw] steamRatingCount
#   @return [String, nil]
#
# @!attribute [rw] steamRatingPercent
#   @return [String, nil]
#
# @!attribute [rw] steamRatingText
#   @return [String, nil]
#
# @!attribute [rw] storeID
#   @return [String, nil]
#
# @!attribute [rw] thumb
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
DealListMatch = Struct.new(
  :dealID,
  :dealRating,
  :gameID,
  :internalName,
  :isOnSale,
  :lastChange,
  :metacriticLink,
  :metacriticScore,
  :normalPrice,
  :releaseDate,
  :salePrice,
  :savings,
  :steamAppID,
  :steamRatingCount,
  :steamRatingPercent,
  :steamRatingText,
  :storeID,
  :thumb,
  :title,
  keyword_init: true
)

# Game entity data model.
#
# @!attribute [rw] cheapest
#   @return [String, nil]
#
# @!attribute [rw] cheapestDealID
#   @return [String, nil]
#
# @!attribute [rw] external
#   @return [String, nil]
#
# @!attribute [rw] gameID
#   @return [String, nil]
#
# @!attribute [rw] internalName
#   @return [String, nil]
#
# @!attribute [rw] steamAppID
#   @return [String, nil]
#
# @!attribute [rw] thumb
#   @return [String, nil]
Game = Struct.new(
  :cheapest,
  :cheapestDealID,
  :external,
  :gameID,
  :internalName,
  :steamAppID,
  :thumb,
  keyword_init: true
)

# Request payload for Game#list.
#
# @!attribute [rw] cheapest
#   @return [String, nil]
#
# @!attribute [rw] cheapestDealID
#   @return [String, nil]
#
# @!attribute [rw] external
#   @return [String, nil]
#
# @!attribute [rw] gameID
#   @return [String, nil]
#
# @!attribute [rw] internalName
#   @return [String, nil]
#
# @!attribute [rw] steamAppID
#   @return [String, nil]
#
# @!attribute [rw] thumb
#   @return [String, nil]
GameListMatch = Struct.new(
  :cheapest,
  :cheapestDealID,
  :external,
  :gameID,
  :internalName,
  :steamAppID,
  :thumb,
  keyword_init: true
)

# Store entity data model.
#
# @!attribute [rw] images
#   @return [Hash, nil]
#
# @!attribute [rw] isActive
#   @return [Integer, nil]
#
# @!attribute [rw] storeID
#   @return [String, nil]
#
# @!attribute [rw] storeName
#   @return [String, nil]
Store = Struct.new(
  :images,
  :isActive,
  :storeID,
  :storeName,
  keyword_init: true
)

# Request payload for Store#list.
#
# @!attribute [rw] images
#   @return [Hash, nil]
#
# @!attribute [rw] isActive
#   @return [Integer, nil]
#
# @!attribute [rw] storeID
#   @return [String, nil]
#
# @!attribute [rw] storeName
#   @return [String, nil]
StoreListMatch = Struct.new(
  :images,
  :isActive,
  :storeID,
  :storeName,
  keyword_init: true
)

