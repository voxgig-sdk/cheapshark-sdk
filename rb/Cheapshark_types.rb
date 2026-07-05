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
# @!attribute [rw] game_id
#   @return [String, nil]
#
# @!attribute [rw] game_title
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
Alert = Struct.new(
  :email,
  :game_id,
  :game_title,
  :price,
  keyword_init: true
)

# Request payload for Alert#list.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] game_id
#   @return [String, nil]
#
# @!attribute [rw] game_title
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
AlertListMatch = Struct.new(
  :email,
  :game_id,
  :game_title,
  :price,
  keyword_init: true
)

# Request payload for Alert#create.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] game_id
#   @return [String, nil]
#
# @!attribute [rw] game_title
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
AlertCreateData = Struct.new(
  :email,
  :game_id,
  :game_title,
  :price,
  keyword_init: true
)

# Request payload for Alert#remove.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] game_id
#   @return [String, nil]
#
# @!attribute [rw] game_title
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
AlertRemoveMatch = Struct.new(
  :email,
  :game_id,
  :game_title,
  :price,
  keyword_init: true
)

# Deal entity data model.
#
# @!attribute [rw] deal_id
#   @return [String, nil]
#
# @!attribute [rw] deal_rating
#   @return [String, nil]
#
# @!attribute [rw] game_id
#   @return [String, nil]
#
# @!attribute [rw] internal_name
#   @return [String, nil]
#
# @!attribute [rw] is_on_sale
#   @return [Boolean, nil]
#
# @!attribute [rw] last_change
#   @return [Integer, nil]
#
# @!attribute [rw] metacritic_link
#   @return [String, nil]
#
# @!attribute [rw] metacritic_score
#   @return [String, nil]
#
# @!attribute [rw] normal_price
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [Integer, nil]
#
# @!attribute [rw] sale_price
#   @return [String, nil]
#
# @!attribute [rw] saving
#   @return [String, nil]
#
# @!attribute [rw] steam_app_id
#   @return [String, nil]
#
# @!attribute [rw] steam_rating_count
#   @return [String, nil]
#
# @!attribute [rw] steam_rating_percent
#   @return [String, nil]
#
# @!attribute [rw] steam_rating_text
#   @return [String, nil]
#
# @!attribute [rw] store_id
#   @return [String, nil]
#
# @!attribute [rw] thumb
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Deal = Struct.new(
  :deal_id,
  :deal_rating,
  :game_id,
  :internal_name,
  :is_on_sale,
  :last_change,
  :metacritic_link,
  :metacritic_score,
  :normal_price,
  :release_date,
  :sale_price,
  :saving,
  :steam_app_id,
  :steam_rating_count,
  :steam_rating_percent,
  :steam_rating_text,
  :store_id,
  :thumb,
  :title,
  keyword_init: true
)

# Request payload for Deal#list.
#
# @!attribute [rw] deal_id
#   @return [String, nil]
#
# @!attribute [rw] deal_rating
#   @return [String, nil]
#
# @!attribute [rw] game_id
#   @return [String, nil]
#
# @!attribute [rw] internal_name
#   @return [String, nil]
#
# @!attribute [rw] is_on_sale
#   @return [Boolean, nil]
#
# @!attribute [rw] last_change
#   @return [Integer, nil]
#
# @!attribute [rw] metacritic_link
#   @return [String, nil]
#
# @!attribute [rw] metacritic_score
#   @return [String, nil]
#
# @!attribute [rw] normal_price
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [Integer, nil]
#
# @!attribute [rw] sale_price
#   @return [String, nil]
#
# @!attribute [rw] saving
#   @return [String, nil]
#
# @!attribute [rw] steam_app_id
#   @return [String, nil]
#
# @!attribute [rw] steam_rating_count
#   @return [String, nil]
#
# @!attribute [rw] steam_rating_percent
#   @return [String, nil]
#
# @!attribute [rw] steam_rating_text
#   @return [String, nil]
#
# @!attribute [rw] store_id
#   @return [String, nil]
#
# @!attribute [rw] thumb
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
DealListMatch = Struct.new(
  :deal_id,
  :deal_rating,
  :game_id,
  :internal_name,
  :is_on_sale,
  :last_change,
  :metacritic_link,
  :metacritic_score,
  :normal_price,
  :release_date,
  :sale_price,
  :saving,
  :steam_app_id,
  :steam_rating_count,
  :steam_rating_percent,
  :steam_rating_text,
  :store_id,
  :thumb,
  :title,
  keyword_init: true
)

# Game entity data model.
#
# @!attribute [rw] cheapest
#   @return [String, nil]
#
# @!attribute [rw] cheapest_deal_id
#   @return [String, nil]
#
# @!attribute [rw] external
#   @return [String, nil]
#
# @!attribute [rw] game_id
#   @return [String, nil]
#
# @!attribute [rw] internal_name
#   @return [String, nil]
#
# @!attribute [rw] steam_app_id
#   @return [String, nil]
#
# @!attribute [rw] thumb
#   @return [String, nil]
Game = Struct.new(
  :cheapest,
  :cheapest_deal_id,
  :external,
  :game_id,
  :internal_name,
  :steam_app_id,
  :thumb,
  keyword_init: true
)

# Request payload for Game#list.
#
# @!attribute [rw] cheapest
#   @return [String, nil]
#
# @!attribute [rw] cheapest_deal_id
#   @return [String, nil]
#
# @!attribute [rw] external
#   @return [String, nil]
#
# @!attribute [rw] game_id
#   @return [String, nil]
#
# @!attribute [rw] internal_name
#   @return [String, nil]
#
# @!attribute [rw] steam_app_id
#   @return [String, nil]
#
# @!attribute [rw] thumb
#   @return [String, nil]
GameListMatch = Struct.new(
  :cheapest,
  :cheapest_deal_id,
  :external,
  :game_id,
  :internal_name,
  :steam_app_id,
  :thumb,
  keyword_init: true
)

# Store entity data model.
#
# @!attribute [rw] image
#   @return [Hash, nil]
#
# @!attribute [rw] is_active
#   @return [Integer, nil]
#
# @!attribute [rw] store_id
#   @return [String, nil]
#
# @!attribute [rw] store_name
#   @return [String, nil]
Store = Struct.new(
  :image,
  :is_active,
  :store_id,
  :store_name,
  keyword_init: true
)

# Request payload for Store#list.
#
# @!attribute [rw] image
#   @return [Hash, nil]
#
# @!attribute [rw] is_active
#   @return [Integer, nil]
#
# @!attribute [rw] store_id
#   @return [String, nil]
#
# @!attribute [rw] store_name
#   @return [String, nil]
StoreListMatch = Struct.new(
  :image,
  :is_active,
  :store_id,
  :store_name,
  keyword_init: true
)

