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
    game_id: str
    game_title: str
    price: float


class AlertListMatch(TypedDict, total=False):
    email: str
    game_id: str
    game_title: str
    price: float


class AlertCreateData(TypedDict, total=False):
    email: str
    game_id: str
    game_title: str
    price: float


class AlertRemoveMatch(TypedDict, total=False):
    email: str
    game_id: str
    game_title: str
    price: float


class Deal(TypedDict, total=False):
    deal_id: str
    deal_rating: str
    game_id: str
    internal_name: str
    is_on_sale: bool
    last_change: int
    metacritic_link: str
    metacritic_score: str
    normal_price: str
    release_date: int
    sale_price: str
    saving: str
    steam_app_id: str
    steam_rating_count: str
    steam_rating_percent: str
    steam_rating_text: str
    store_id: str
    thumb: str
    title: str


class DealListMatch(TypedDict, total=False):
    deal_id: str
    deal_rating: str
    game_id: str
    internal_name: str
    is_on_sale: bool
    last_change: int
    metacritic_link: str
    metacritic_score: str
    normal_price: str
    release_date: int
    sale_price: str
    saving: str
    steam_app_id: str
    steam_rating_count: str
    steam_rating_percent: str
    steam_rating_text: str
    store_id: str
    thumb: str
    title: str


class Game(TypedDict, total=False):
    cheapest: str
    cheapest_deal_id: str
    external: str
    game_id: str
    internal_name: str
    steam_app_id: str
    thumb: str


class GameListMatch(TypedDict, total=False):
    cheapest: str
    cheapest_deal_id: str
    external: str
    game_id: str
    internal_name: str
    steam_app_id: str
    thumb: str


class Store(TypedDict, total=False):
    image: dict
    is_active: int
    store_id: str
    store_name: str


class StoreListMatch(TypedDict, total=False):
    image: dict
    is_active: int
    store_id: str
    store_name: str
