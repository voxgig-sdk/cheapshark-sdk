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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$alert = $client->alert();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | No |  |
| `game_id` | ``$STRING`` | No |  |
| `game_title` | ``$STRING`` | No |  |
| `price` | ``$NUMBER`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->alert()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->alert()->list([]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->alert()->remove(["id" => "alert_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AlertEntity`

Create a new `AlertEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DealEntity

```php
$deal = $client->deal();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deal_id` | ``$STRING`` | No |  |
| `deal_rating` | ``$STRING`` | No |  |
| `game_id` | ``$STRING`` | No |  |
| `internal_name` | ``$STRING`` | No |  |
| `is_on_sale` | ``$BOOLEAN`` | No |  |
| `last_change` | ``$INTEGER`` | No |  |
| `metacritic_link` | ``$STRING`` | No |  |
| `metacritic_score` | ``$STRING`` | No |  |
| `normal_price` | ``$STRING`` | No |  |
| `release_date` | ``$INTEGER`` | No |  |
| `sale_price` | ``$STRING`` | No |  |
| `saving` | ``$STRING`` | No |  |
| `steam_app_id` | ``$STRING`` | No |  |
| `steam_rating_count` | ``$STRING`` | No |  |
| `steam_rating_percent` | ``$STRING`` | No |  |
| `steam_rating_text` | ``$STRING`` | No |  |
| `store_id` | ``$STRING`` | No |  |
| `thumb` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->deal()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DealEntity`

Create a new `DealEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GameEntity

```php
$game = $client->game();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cheapest` | ``$STRING`` | No |  |
| `cheapest_deal_id` | ``$STRING`` | No |  |
| `external` | ``$STRING`` | No |  |
| `game_id` | ``$STRING`` | No |  |
| `internal_name` | ``$STRING`` | No |  |
| `steam_app_id` | ``$STRING`` | No |  |
| `thumb` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->game()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GameEntity`

Create a new `GameEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StoreEntity

```php
$store = $client->store();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | ``$OBJECT`` | No |  |
| `is_active` | ``$INTEGER`` | No |  |
| `store_id` | ``$STRING`` | No |  |
| `store_name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->store()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StoreEntity`

Create a new `StoreEntity` instance with the same client and
options.

#### `getName(): string`

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

