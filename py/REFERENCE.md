# Cheapshark Python SDK Reference

Complete API reference for the Cheapshark Python SDK.


## CheapsharkSDK

### Constructor

```python
from cheapshark_sdk import CheapsharkSDK

client = CheapsharkSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CheapsharkSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CheapsharkSDK.test()
```


### Instance Methods

#### `Alert(data=None)`

Create a new `AlertEntity` instance. Pass `None` for no initial data.

#### `Deal(data=None)`

Create a new `DealEntity` instance. Pass `None` for no initial data.

#### `Game(data=None)`

Create a new `GameEntity` instance. Pass `None` for no initial data.

#### `Store(data=None)`

Create a new `StoreEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AlertEntity

```python
alert = client.Alert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | No | Email address for the alert |
| `gameID` | `str` | No | Game identifier |
| `gameTitle` | `str` | No | Title of the game |
| `price` | `float` | No | Target price for the alert |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Alert().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Alert().list({"email": "example"})
for alert in results:
    print(alert)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Alert().remove({"email": "email", "game_id": "game_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AlertEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DealEntity

```python
deal = client.Deal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dealID` | `str` | No | Unique identifier for the deal |
| `dealRating` | `str` | No | Rating of the deal |
| `gameID` | `str` | No | Game identifier |
| `internalName` | `str` | No | Internal name of the game |
| `isOnSale` | `str` | No | Whether the game is on sale (0 or 1) |
| `lastChange` | `int` | No | Unix timestamp of last price change |
| `metacriticLink` | `str` | No | Link to Metacritic page |
| `metacriticScore` | `str` | No | Metacritic score |
| `normalPrice` | `str` | No | Regular price |
| `releaseDate` | `int` | No | Unix timestamp of release date |
| `salePrice` | `str` | No | Current sale price |
| `savings` | `str` | No | Percentage savings |
| `steamAppID` | `str` | No | Steam App ID |
| `steamRatingCount` | `str` | No | Number of Steam ratings |
| `steamRatingPercent` | `str` | No | Steam rating percentage |
| `steamRatingText` | `str` | No | Steam rating description |
| `storeID` | `str` | No | Store identifier |
| `thumb` | `str` | No | Thumbnail image URL |
| `title` | `str` | No | Title of the game |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Deal().list()
for deal in results:
    print(deal)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DealEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GameEntity

```python
game = client.Game()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cheapest` | `str` | No | Lowest price found |
| `cheapestDealID` | `str` | No | Deal ID for the cheapest price |
| `external` | `str` | No | External game title |
| `gameID` | `str` | No | Unique game identifier |
| `internalName` | `str` | No | Internal game name |
| `steamAppID` | `str` | No | Steam App ID |
| `thumb` | `str` | No | Thumbnail image URL |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Game().list()
for game in results:
    print(game)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GameEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StoreEntity

```python
store = client.Store()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `images` | `dict` | No |  |
| `isActive` | `int` | No | Whether the store is active (0 or 1) |
| `storeID` | `str` | No | Unique store identifier |
| `storeName` | `str` | No | Name of the store |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Store().list()
for store in results:
    print(store)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StoreEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = CheapsharkSDK({
    "feature": {
        "test": {"active": True},
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

