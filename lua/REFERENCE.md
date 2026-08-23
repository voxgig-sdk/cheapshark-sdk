# Cheapshark Lua SDK Reference

Complete API reference for the Cheapshark Lua SDK.


## CheapsharkSDK

### Constructor

```lua
local sdk = require("cheapshark_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Alert(data)`

Create a new `Alert` entity instance. Pass `nil` for no initial data.

#### `Deal(data)`

Create a new `Deal` entity instance. Pass `nil` for no initial data.

#### `Game(data)`

Create a new `Game` entity instance. Pass `nil` for no initial data.

#### `Store(data)`

Create a new `Store` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AlertEntity

```lua
local alert = client:Alert(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | Email address for the alert |
| `gameID` | `string` | No | Game identifier |
| `gameTitle` | `string` | No | Title of the game |
| `price` | `number` | No | Target price for the alert |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Alert():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Alert():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Alert():remove()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AlertEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DealEntity

```lua
local deal = client:Deal(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dealID` | `string` | No | Unique identifier for the deal |
| `dealRating` | `string` | No | Rating of the deal |
| `gameID` | `string` | No | Game identifier |
| `internalName` | `string` | No | Internal name of the game |
| `isOnSale` | `string` | No | Whether the game is on sale (0 or 1) |
| `lastChange` | `number` | No | Unix timestamp of last price change |
| `metacriticLink` | `string` | No | Link to Metacritic page |
| `metacriticScore` | `string` | No | Metacritic score |
| `normalPrice` | `string` | No | Regular price |
| `releaseDate` | `number` | No | Unix timestamp of release date |
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Deal():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DealEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GameEntity

```lua
local game = client:Game(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Game():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GameEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StoreEntity

```lua
local store = client:Store(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `images` | `table` | No |  |
| `isActive` | `number` | No | Whether the store is active (0 or 1) |
| `storeID` | `string` | No | Unique store identifier |
| `storeName` | `string` | No | Name of the store |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Store():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StoreEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

