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
    public ?string $gameID = null;
    public ?string $gameTitle = null;
    public ?float $price = null;
}

/** Request payload for Alert#list. */
class AlertListMatch
{
    public ?string $email = null;
    public ?string $gameID = null;
    public ?string $gameTitle = null;
    public ?float $price = null;
}

/** Request payload for Alert#create. */
class AlertCreateData
{
    public ?string $email = null;
    public ?string $gameID = null;
    public ?string $gameTitle = null;
    public ?float $price = null;
}

/** Request payload for Alert#remove. */
class AlertRemoveMatch
{
    public ?string $email = null;
    public ?string $gameID = null;
    public ?string $gameTitle = null;
    public ?float $price = null;
}

/** Deal entity data model. */
class Deal
{
    public ?string $dealID = null;
    public ?string $dealRating = null;
    public ?string $gameID = null;
    public ?string $internalName = null;
    public ?string $isOnSale = null;
    public ?int $lastChange = null;
    public ?string $metacriticLink = null;
    public ?string $metacriticScore = null;
    public ?string $normalPrice = null;
    public ?int $releaseDate = null;
    public ?string $salePrice = null;
    public ?string $savings = null;
    public ?string $steamAppID = null;
    public ?string $steamRatingCount = null;
    public ?string $steamRatingPercent = null;
    public ?string $steamRatingText = null;
    public ?string $storeID = null;
    public ?string $thumb = null;
    public ?string $title = null;
}

/** Request payload for Deal#list. */
class DealListMatch
{
    public ?string $dealID = null;
    public ?string $dealRating = null;
    public ?string $gameID = null;
    public ?string $internalName = null;
    public ?string $isOnSale = null;
    public ?int $lastChange = null;
    public ?string $metacriticLink = null;
    public ?string $metacriticScore = null;
    public ?string $normalPrice = null;
    public ?int $releaseDate = null;
    public ?string $salePrice = null;
    public ?string $savings = null;
    public ?string $steamAppID = null;
    public ?string $steamRatingCount = null;
    public ?string $steamRatingPercent = null;
    public ?string $steamRatingText = null;
    public ?string $storeID = null;
    public ?string $thumb = null;
    public ?string $title = null;
}

/** Game entity data model. */
class Game
{
    public ?string $cheapest = null;
    public ?string $cheapestDealID = null;
    public ?string $external = null;
    public ?string $gameID = null;
    public ?string $internalName = null;
    public ?string $steamAppID = null;
    public ?string $thumb = null;
}

/** Request payload for Game#list. */
class GameListMatch
{
    public ?string $cheapest = null;
    public ?string $cheapestDealID = null;
    public ?string $external = null;
    public ?string $gameID = null;
    public ?string $internalName = null;
    public ?string $steamAppID = null;
    public ?string $thumb = null;
}

/** Store entity data model. */
class Store
{
    public ?array $images = null;
    public ?int $isActive = null;
    public ?string $storeID = null;
    public ?string $storeName = null;
}

/** Request payload for Store#list. */
class StoreListMatch
{
    public ?array $images = null;
    public ?int $isActive = null;
    public ?string $storeID = null;
    public ?string $storeName = null;
}

