# Typed models for the Cheapshark SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Alert:
    email: Optional[str] = None
    game_id: Optional[str] = None
    game_title: Optional[str] = None
    price: Optional[float] = None


@dataclass
class AlertListMatch:
    email: Optional[str] = None
    game_id: Optional[str] = None
    game_title: Optional[str] = None
    price: Optional[float] = None


@dataclass
class AlertCreateData:
    email: Optional[str] = None
    game_id: Optional[str] = None
    game_title: Optional[str] = None
    price: Optional[float] = None


@dataclass
class AlertRemoveMatch:
    email: Optional[str] = None
    game_id: Optional[str] = None
    game_title: Optional[str] = None
    price: Optional[float] = None


@dataclass
class Deal:
    deal_id: Optional[str] = None
    deal_rating: Optional[str] = None
    game_id: Optional[str] = None
    internal_name: Optional[str] = None
    is_on_sale: Optional[bool] = None
    last_change: Optional[int] = None
    metacritic_link: Optional[str] = None
    metacritic_score: Optional[str] = None
    normal_price: Optional[str] = None
    release_date: Optional[int] = None
    sale_price: Optional[str] = None
    saving: Optional[str] = None
    steam_app_id: Optional[str] = None
    steam_rating_count: Optional[str] = None
    steam_rating_percent: Optional[str] = None
    steam_rating_text: Optional[str] = None
    store_id: Optional[str] = None
    thumb: Optional[str] = None
    title: Optional[str] = None


@dataclass
class DealListMatch:
    deal_id: Optional[str] = None
    deal_rating: Optional[str] = None
    game_id: Optional[str] = None
    internal_name: Optional[str] = None
    is_on_sale: Optional[bool] = None
    last_change: Optional[int] = None
    metacritic_link: Optional[str] = None
    metacritic_score: Optional[str] = None
    normal_price: Optional[str] = None
    release_date: Optional[int] = None
    sale_price: Optional[str] = None
    saving: Optional[str] = None
    steam_app_id: Optional[str] = None
    steam_rating_count: Optional[str] = None
    steam_rating_percent: Optional[str] = None
    steam_rating_text: Optional[str] = None
    store_id: Optional[str] = None
    thumb: Optional[str] = None
    title: Optional[str] = None


@dataclass
class Game:
    cheapest: Optional[str] = None
    cheapest_deal_id: Optional[str] = None
    external: Optional[str] = None
    game_id: Optional[str] = None
    internal_name: Optional[str] = None
    steam_app_id: Optional[str] = None
    thumb: Optional[str] = None


@dataclass
class GameListMatch:
    cheapest: Optional[str] = None
    cheapest_deal_id: Optional[str] = None
    external: Optional[str] = None
    game_id: Optional[str] = None
    internal_name: Optional[str] = None
    steam_app_id: Optional[str] = None
    thumb: Optional[str] = None


@dataclass
class Store:
    image: Optional[dict] = None
    is_active: Optional[int] = None
    store_id: Optional[str] = None
    store_name: Optional[str] = None


@dataclass
class StoreListMatch:
    image: Optional[dict] = None
    is_active: Optional[int] = None
    store_id: Optional[str] = None
    store_name: Optional[str] = None

