# Cheapshark PHP SDK



The PHP SDK for the Cheapshark API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Alert()` — with named operations (`list`/`create`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/cheapshark-sdk/releases](https://github.com/voxgig-sdk/cheapshark-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'cheapshark_sdk.php';

$client = new CheapsharkSDK();
```

### 2. List alert records

```php
try {
    // list() returns an array of Alert records — iterate directly.
    $alerts = $client->Alert()->list();
    foreach ($alerts as $item) {
        echo $item["email"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Alert record.
$created = $client->Alert()->create(["email" => "example_email", "gameID" => "example_gameID"]);

// Remove
$client->Alert()->remove();
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $alerts = $client->Alert()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = CheapsharkSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$alert = $client->Alert()->list();
print_r($alert);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CheapsharkSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CHEAPSHARK_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CheapsharkSDK

```php
require_once 'cheapshark_sdk.php';
$client = new CheapsharkSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CheapsharkSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CheapsharkSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Alert` | `($data): AlertEntity` | Create an Alert entity instance. |
| `Deal` | `($data): DealEntity` | Create a Deal entity instance. |
| `Game` | `($data): GameEntity` | Create a Game entity instance. |
| `Store` | `($data): StoreEntity` | Create a Store entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Alert

| Field | Description |
| --- | --- |
| `email` | Email address for the alert |
| `gameID` | Game identifier |
| `gameTitle` | Title of the game |
| `price` | Target price for the alert |

Operations: Create, List, Remove.

API path: `/alerts`

#### Deal

| Field | Description |
| --- | --- |
| `dealID` | Unique identifier for the deal |
| `dealRating` | Rating of the deal |
| `gameID` | Game identifier |
| `internalName` | Internal name of the game |
| `isOnSale` | Whether the game is on sale (0 or 1) |
| `lastChange` | Unix timestamp of last price change |
| `metacriticLink` | Link to Metacritic page |
| `metacriticScore` | Metacritic score |
| `normalPrice` | Regular price |
| `releaseDate` | Unix timestamp of release date |
| `salePrice` | Current sale price |
| `savings` | Percentage savings |
| `steamAppID` | Steam App ID |
| `steamRatingCount` | Number of Steam ratings |
| `steamRatingPercent` | Steam rating percentage |
| `steamRatingText` | Steam rating description |
| `storeID` | Store identifier |
| `thumb` | Thumbnail image URL |
| `title` | Title of the game |

Operations: List.

API path: `/deals`

#### Game

| Field | Description |
| --- | --- |
| `cheapest` | Lowest price found |
| `cheapestDealID` | Deal ID for the cheapest price |
| `external` | External game title |
| `gameID` | Unique game identifier |
| `internalName` | Internal game name |
| `steamAppID` | Steam App ID |
| `thumb` | Thumbnail image URL |

Operations: List.

API path: `/games`

#### Store

| Field | Description |
| --- | --- |
| `images` |  |
| `isActive` | Whether the store is active (0 or 1) |
| `storeID` | Unique store identifier |
| `storeName` | Name of the store |

Operations: List.

API path: `/stores`



## Entities


### Alert

Create an instance: `$alert = $client->Alert();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | Email address for the alert |
| `gameID` | `string` | Game identifier |
| `gameTitle` | `string` | Title of the game |
| `price` | `float` | Target price for the alert |

#### Example: List

```php
// list() returns an array of Alert records (throws on error).
$alerts = $client->Alert()->list();
```

#### Example: Create

```php
$alert = $client->Alert()->create([
]);
```


### Deal

Create an instance: `$deal = $client->Deal();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dealID` | `string` | Unique identifier for the deal |
| `dealRating` | `string` | Rating of the deal |
| `gameID` | `string` | Game identifier |
| `internalName` | `string` | Internal name of the game |
| `isOnSale` | `string` | Whether the game is on sale (0 or 1) |
| `lastChange` | `int` | Unix timestamp of last price change |
| `metacriticLink` | `string` | Link to Metacritic page |
| `metacriticScore` | `string` | Metacritic score |
| `normalPrice` | `string` | Regular price |
| `releaseDate` | `int` | Unix timestamp of release date |
| `salePrice` | `string` | Current sale price |
| `savings` | `string` | Percentage savings |
| `steamAppID` | `string` | Steam App ID |
| `steamRatingCount` | `string` | Number of Steam ratings |
| `steamRatingPercent` | `string` | Steam rating percentage |
| `steamRatingText` | `string` | Steam rating description |
| `storeID` | `string` | Store identifier |
| `thumb` | `string` | Thumbnail image URL |
| `title` | `string` | Title of the game |

#### Example: List

```php
// list() returns an array of Deal records (throws on error).
$deals = $client->Deal()->list();
```


### Game

Create an instance: `$game = $client->Game();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cheapest` | `string` | Lowest price found |
| `cheapestDealID` | `string` | Deal ID for the cheapest price |
| `external` | `string` | External game title |
| `gameID` | `string` | Unique game identifier |
| `internalName` | `string` | Internal game name |
| `steamAppID` | `string` | Steam App ID |
| `thumb` | `string` | Thumbnail image URL |

#### Example: List

```php
// list() returns an array of Game records (throws on error).
$games = $client->Game()->list();
```


### Store

Create an instance: `$store = $client->Store();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `images` | `array` |  |
| `isActive` | `int` | Whether the store is active (0 or 1) |
| `storeID` | `string` | Unique store identifier |
| `storeName` | `string` | Name of the store |

#### Example: List

```php
// list() returns an array of Store records (throws on error).
$stores = $client->Store()->list();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── cheapshark_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`cheapshark_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$alert = $client->Alert();
$alert->list();

// $alert->data_get() now returns the alert data from the last list
// $alert->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
