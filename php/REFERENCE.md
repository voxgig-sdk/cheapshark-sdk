# Cheapshark PHP SDK Reference

Complete API reference for the Cheapshark PHP SDK.


## CheapsharkSDK

### Constructor

```php
require_once __DIR__ . '/cheapshark_sdk.php';

$client = new CheapsharkSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CheapsharkSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CheapsharkSDK::test();
```


### Instance Methods

#### `Alert($data = null)`

Create a new `AlertEntity` instance. Pass `null` for no initial data.

#### `Deal($data = null)`

Create a new `DealEntity` instance. Pass `null` for no initial data.

#### `Game($data = null)`

Create a new `GameEntity` instance. Pass `null` for no initial data.

#### `Store($data = null)`

Create a new `StoreEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CheapsharkUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AlertEntity

```php
$alert = $client->Alert();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | Email address for the alert |
| `gameID` | `string` | No | Game identifier |
| `gameTitle` | `string` | No | Title of the game |
| `price` | `float` | No | Target price for the alert |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Alert()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Alert()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Alert()->remove();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AlertEntity`

Create a new `AlertEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DealEntity

```php
$deal = $client->Deal();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dealID` | `string` | No | Unique identifier for the deal |
| `dealRating` | `string` | No | Rating of the deal |
| `gameID` | `string` | No | Game identifier |
| `internalName` | `string` | No | Internal name of the game |
| `isOnSale` | `string` | No | Whether the game is on sale (0 or 1) |
| `lastChange` | `int` | No | Unix timestamp of last price change |
| `metacriticLink` | `string` | No | Link to Metacritic page |
| `metacriticScore` | `string` | No | Metacritic score |
| `normalPrice` | `string` | No | Regular price |
| `releaseDate` | `int` | No | Unix timestamp of release date |
| `salePrice` | `string` | No | Current sale price |
| `savings` | `string` | No | Percentage savings |
| `steamAppID` | `string` | No | Steam App ID |
| `steamRatingCount` | `string` | No | Number of Steam ratings |
| `steamRatingPercent` | `string` | No | Steam rating percentage |
| `steamRatingText` | `string` | No | Steam rating description |
| `storeID` | `string` | No | Store identifier |
| `thumb` | `string` | No | Thumbnail image URL |
| `title` | `string` | No | Title of the game |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Deal()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DealEntity`

Create a new `DealEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GameEntity

```php
$game = $client->Game();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cheapest` | `string` | No | Lowest price found |
| `cheapestDealID` | `string` | No | Deal ID for the cheapest price |
| `external` | `string` | No | External game title |
| `gameID` | `string` | No | Unique game identifier |
| `internalName` | `string` | No | Internal game name |
| `steamAppID` | `string` | No | Steam App ID |
| `thumb` | `string` | No | Thumbnail image URL |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Game()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GameEntity`

Create a new `GameEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StoreEntity

```php
$store = $client->Store();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `images` | `array` | No |  |
| `isActive` | `int` | No | Whether the store is active (0 or 1) |
| `storeID` | `string` | No | Unique store identifier |
| `storeName` | `string` | No | Name of the store |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Store()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StoreEntity`

Create a new `StoreEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CheapsharkSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

