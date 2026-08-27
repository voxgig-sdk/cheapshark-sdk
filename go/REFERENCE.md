# Cheapshark Golang SDK Reference

Complete API reference for the Cheapshark Golang SDK.


## CheapsharkSDK

### Constructor

```go
func NewCheapsharkSDK(options map[string]any) *CheapsharkSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *CheapsharkSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *CheapsharkSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Alert(data map[string]any) CheapsharkEntity`

Create a new `Alert` entity instance. Pass `nil` for no initial data.

#### `Deal(data map[string]any) CheapsharkEntity`

Create a new `Deal` entity instance. Pass `nil` for no initial data.

#### `Game(data map[string]any) CheapsharkEntity`

Create a new `Game` entity instance. Pass `nil` for no initial data.

#### `Store(data map[string]any) CheapsharkEntity`

Create a new `Store` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AlertEntity

```go
alert := client.Alert(nil)
fmt.Println(alert.GetName()) // "alert"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | Email address for the alert |
| `gameID` | `string` | No | Game identifier |
| `gameTitle` | `string` | No | Title of the game |
| `price` | `float64` | No | Target price for the alert |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Alert(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Alert(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Alert(nil).Remove(map[string]any{"email": "email", "game_id": "game_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AlertEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DealEntity

```go
deal := client.Deal(nil)
fmt.Println(deal.GetName()) // "deal"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Deal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DealEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GameEntity

```go
game := client.Game(nil)
fmt.Println(game.GetName()) // "game"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Game(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GameEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StoreEntity

```go
store := client.Store(nil)
fmt.Println(store.GetName()) // "store"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `images` | `map[string]any` | No |  |
| `isActive` | `int` | No | Whether the store is active (0 or 1) |
| `storeID` | `string` | No | Unique store identifier |
| `storeName` | `string` | No | Name of the store |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Store(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StoreEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewCheapsharkSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

