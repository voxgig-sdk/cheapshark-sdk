<?php
declare(strict_types=1);

// Typed models for the Cheapshark SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Alert entity data model. */
class Alert
{
    public ?string $email = null;
    public ?string $game_id = null;
    public ?string $game_title = null;
    public ?float $price = null;
}

/** Match filter for Alert#list (any subset of Alert fields). */
class AlertListMatch
{
    public ?string $email = null;
    public ?string $game_id = null;
    public ?string $game_title = null;
    public ?float $price = null;
}

/** Match filter for Alert#create (any subset of Alert fields). */
class AlertCreateData
{
    public ?string $email = null;
    public ?string $game_id = null;
    public ?string $game_title = null;
    public ?float $price = null;
}

/** Match filter for Alert#remove (any subset of Alert fields). */
class AlertRemoveMatch
{
    public ?string $email = null;
    public ?string $game_id = null;
    public ?string $game_title = null;
    public ?float $price = null;
}

/** Deal entity data model. */
class Deal
{
    public ?string $deal_id = null;
    public ?string $deal_rating = null;
    public ?string $game_id = null;
    public ?string $internal_name = null;
    public ?bool $is_on_sale = null;
    public ?int $last_change = null;
    public ?string $metacritic_link = null;
    public ?string $metacritic_score = null;
    public ?string $normal_price = null;
    public ?int $release_date = null;
    public ?string $sale_price = null;
    public ?string $saving = null;
    public ?string $steam_app_id = null;
    public ?string $steam_rating_count = null;
    public ?string $steam_rating_percent = null;
    public ?string $steam_rating_text = null;
    public ?string $store_id = null;
    public ?string $thumb = null;
    public ?string $title = null;
}

/** Match filter for Deal#list (any subset of Deal fields). */
class DealListMatch
{
    public ?string $deal_id = null;
    public ?string $deal_rating = null;
    public ?string $game_id = null;
    public ?string $internal_name = null;
    public ?bool $is_on_sale = null;
    public ?int $last_change = null;
    public ?string $metacritic_link = null;
    public ?string $metacritic_score = null;
    public ?string $normal_price = null;
    public ?int $release_date = null;
    public ?string $sale_price = null;
    public ?string $saving = null;
    public ?string $steam_app_id = null;
    public ?string $steam_rating_count = null;
    public ?string $steam_rating_percent = null;
    public ?string $steam_rating_text = null;
    public ?string $store_id = null;
    public ?string $thumb = null;
    public ?string $title = null;
}

/** Game entity data model. */
class Game
{
    public ?string $cheapest = null;
    public ?string $cheapest_deal_id = null;
    public ?string $external = null;
    public ?string $game_id = null;
    public ?string $internal_name = null;
    public ?string $steam_app_id = null;
    public ?string $thumb = null;
}

/** Match filter for Game#list (any subset of Game fields). */
class GameListMatch
{
    public ?string $cheapest = null;
    public ?string $cheapest_deal_id = null;
    public ?string $external = null;
    public ?string $game_id = null;
    public ?string $internal_name = null;
    public ?string $steam_app_id = null;
    public ?string $thumb = null;
}

/** Store entity data model. */
class Store
{
    public ?array $image = null;
    public ?int $is_active = null;
    public ?string $store_id = null;
    public ?string $store_name = null;
}

/** Match filter for Store#list (any subset of Store fields). */
class StoreListMatch
{
    public ?array $image = null;
    public ?int $is_active = null;
    public ?string $store_id = null;
    public ?string $store_name = null;
}

