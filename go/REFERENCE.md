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
| `email` | `string` | No |  |
| `game_id` | `string` | No |  |
| `game_title` | `string` | No |  |
| `price` | `float64` | No |  |

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
result, err := client.Alert(nil).Remove(nil, nil)
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
| `deal_id` | `string` | No |  |
| `deal_rating` | `string` | No |  |
| `game_id` | `string` | No |  |
| `internal_name` | `string` | No |  |
| `is_on_sale` | `bool` | No |  |
| `last_change` | `int` | No |  |
| `metacritic_link` | `string` | No |  |
| `metacritic_score` | `string` | No |  |
| `normal_price` | `string` | No |  |
| `release_date` | `int` | No |  |
| `sale_price` | `string` | No |  |
| `saving` | `string` | No |  |
| `steam_app_id` | `string` | No |  |
| `steam_rating_count` | `string` | No |  |
| `steam_rating_percent` | `string` | No |  |
| `steam_rating_text` | `string` | No |  |
| `store_id` | `string` | No |  |
| `thumb` | `string` | No |  |
| `title` | `string` | No |  |

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
| `cheapest` | `string` | No |  |
| `cheapest_deal_id` | `string` | No |  |
| `external` | `string` | No |  |
| `game_id` | `string` | No |  |
| `internal_name` | `string` | No |  |
| `steam_app_id` | `string` | No |  |
| `thumb` | `string` | No |  |

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
| `image` | `map[string]any` | No |  |
| `is_active` | `int` | No |  |
| `store_id` | `string` | No |  |
| `store_name` | `string` | No |  |

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

