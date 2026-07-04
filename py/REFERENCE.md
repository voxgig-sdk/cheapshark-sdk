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
alert = client.alert
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | No |  |
| `game_id` | ``$STRING`` | No |  |
| `game_title` | ``$STRING`` | No |  |
| `price` | ``$NUMBER`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.alert.create({
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.alert.list({})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.alert.remove({"id": "alert_id"})
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
deal = client.deal
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.deal.list({})
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
game = client.game
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.game.list({})
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
store = client.store
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | ``$OBJECT`` | No |  |
| `is_active` | ``$INTEGER`` | No |  |
| `store_id` | ``$STRING`` | No |  |
| `store_name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.store.list({})
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

