# Cheapshark Golang SDK



The Golang SDK for the Cheapshark API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/cheapshark-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/cheapshark-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/cheapshark-sdk/go=../cheapshark-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/cheapshark-sdk/go"
)

func main() {
    client := sdk.New()

    // List alert records — the value is the array of records itself.
    alerts, err := client.Alert(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range alerts.([]any) {
        fmt.Println(item)
    }

    // Create a alert.
    created, err := client.Alert(nil).Create(map[string]any{"name": "Example"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Remove a alert.
    removed, err := client.Alert(nil).Remove(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

alert, err := client.Alert(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(alert) // the loaded mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewCheapsharkSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CHEAPSHARK_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewCheapsharkSDK

```go
func NewCheapsharkSDK(options map[string]any) *CheapsharkSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *CheapsharkSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CheapsharkSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Alert` | `(data map[string]any) CheapsharkEntity` | Create an Alert entity instance. |
| `Deal` | `(data map[string]any) CheapsharkEntity` | Create a Deal entity instance. |
| `Game` | `(data map[string]any) CheapsharkEntity` | Create a Game entity instance. |
| `Store` | `(data map[string]any) CheapsharkEntity` | Create a Store entity instance. |

### Entity interface (CheapsharkEntity)

All entities implement the `CheapsharkEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    alert, err := client.Alert(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // alert is the loaded record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Alert

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"game_id"` |  |
| `"game_title"` |  |
| `"price"` |  |

Operations: Create, List, Remove.

API path: `/alerts`

#### Deal

| Field | Description |
| --- | --- |
| `"deal_id"` |  |
| `"deal_rating"` |  |
| `"game_id"` |  |
| `"internal_name"` |  |
| `"is_on_sale"` |  |
| `"last_change"` |  |
| `"metacritic_link"` |  |
| `"metacritic_score"` |  |
| `"normal_price"` |  |
| `"release_date"` |  |
| `"sale_price"` |  |
| `"saving"` |  |
| `"steam_app_id"` |  |
| `"steam_rating_count"` |  |
| `"steam_rating_percent"` |  |
| `"steam_rating_text"` |  |
| `"store_id"` |  |
| `"thumb"` |  |
| `"title"` |  |

Operations: List.

API path: `/deals`

#### Game

| Field | Description |
| --- | --- |
| `"cheapest"` |  |
| `"cheapest_deal_id"` |  |
| `"external"` |  |
| `"game_id"` |  |
| `"internal_name"` |  |
| `"steam_app_id"` |  |
| `"thumb"` |  |

Operations: List.

API path: `/games`

#### Store

| Field | Description |
| --- | --- |
| `"image"` |  |
| `"is_active"` |  |
| `"store_id"` |  |
| `"store_name"` |  |

Operations: List.

API path: `/stores`



## Entities


### Alert

Create an instance: `alert := client.Alert(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `game_id` | ``$STRING`` |  |
| `game_title` | ``$STRING`` |  |
| `price` | ``$NUMBER`` |  |

#### Example: List

```go
alerts, err := client.Alert(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(alerts) // the array of records
```

#### Example: Create

```go
result, err := client.Alert(nil).Create(map[string]any{
}, nil)
```


### Deal

Create an instance: `deal := client.Deal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deal_id` | ``$STRING`` |  |
| `deal_rating` | ``$STRING`` |  |
| `game_id` | ``$STRING`` |  |
| `internal_name` | ``$STRING`` |  |
| `is_on_sale` | ``$BOOLEAN`` |  |
| `last_change` | ``$INTEGER`` |  |
| `metacritic_link` | ``$STRING`` |  |
| `metacritic_score` | ``$STRING`` |  |
| `normal_price` | ``$STRING`` |  |
| `release_date` | ``$INTEGER`` |  |
| `sale_price` | ``$STRING`` |  |
| `saving` | ``$STRING`` |  |
| `steam_app_id` | ``$STRING`` |  |
| `steam_rating_count` | ``$STRING`` |  |
| `steam_rating_percent` | ``$STRING`` |  |
| `steam_rating_text` | ``$STRING`` |  |
| `store_id` | ``$STRING`` |  |
| `thumb` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: List

```go
deals, err := client.Deal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(deals) // the array of records
```


### Game

Create an instance: `game := client.Game(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cheapest` | ``$STRING`` |  |
| `cheapest_deal_id` | ``$STRING`` |  |
| `external` | ``$STRING`` |  |
| `game_id` | ``$STRING`` |  |
| `internal_name` | ``$STRING`` |  |
| `steam_app_id` | ``$STRING`` |  |
| `thumb` | ``$STRING`` |  |

#### Example: List

```go
games, err := client.Game(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(games) // the array of records
```


### Store

Create an instance: `store := client.Store(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `image` | ``$OBJECT`` |  |
| `is_active` | ``$INTEGER`` |  |
| `store_id` | ``$STRING`` |  |
| `store_name` | ``$STRING`` |  |

#### Example: List

```go
stores, err := client.Store(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(stores) // the array of records
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/cheapshark-sdk/go/
├── cheapshark.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/cheapshark-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
alert := client.Alert(nil)
alert.Load(map[string]any{"id": "example_id"}, nil)

// alert.Data() now returns the loaded alert data
// alert.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
