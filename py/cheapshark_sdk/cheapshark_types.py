# Typed models for the Cheapshark SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Alert(TypedDict, total=False):
    email: str
    gameID: str
    gameTitle: str
    price: float


class AlertListMatch(TypedDict):
    email: str


class AlertCreateData(TypedDict, total=False):
    email: str
    gameID: str
    gameTitle: str
    price: float


class AlertRemoveMatch(TypedDict):
    email: str
    game_id: str


class Deal(TypedDict, total=False):
    dealID: str
    dealRating: str
    gameID: str
    internalName: str
    isOnSale: str
    lastChange: int
    metacriticLink: str
    metacriticScore: str
    normalPrice: str
    releaseDate: int
    salePrice: str
    savings: str
    steamAppID: str
    steamRatingCount: str
    steamRatingPercent: str
    steamRatingText: str
    storeID: str
    thumb: str
    title: str


class DealListMatch(TypedDict, total=False):
    aaa: int
    desc: int
    exact: int
    lower_price: float
    metacritic: int
    on_sale: int
    output: str
    page_number: int
    page_size: int
    sort_by: str
    steam_app_id: str
    steam_rating: int
    steamwork: int
    store_id: int
    title: str
    upper_price: float


class Game(TypedDict, total=False):
    cheapest: str
    cheapestDealID: str
    external: str
    gameID: str
    internalName: str
    steamAppID: str
    thumb: str


class GameListMatch(TypedDict, total=False):
    exact: int
    limit: int
    steam_app_id: str
    title: str


class Store(TypedDict, total=False):
    images: dict
    isActive: int
    storeID: str
    storeName: str


class StoreListMatch(TypedDict, total=False):
    images: dict
    isActive: int
    storeID: str
    storeName: str
