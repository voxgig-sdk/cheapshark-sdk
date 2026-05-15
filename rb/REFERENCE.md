# Cheapshark Ruby SDK Reference

Complete API reference for the Cheapshark Ruby SDK.


## CheapsharkSDK

### Constructor

```ruby
require_relative 'cheapshark_sdk'

client = CheapsharkSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CheapsharkSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CheapsharkSDK.test
```


### Instance Methods

#### `Alert(data = nil)`

Create a new `Alert` entity instance. Pass `nil` for no initial data.

#### `Deal(data = nil)`

Create a new `Deal` entity instance. Pass `nil` for no initial data.

#### `Game(data = nil)`

Create a new `Game` entity instance. Pass `nil` for no initial data.

#### `Store(data = nil)`

Create a new `Store` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## AlertEntity

```ruby
alert = client.Alert
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | No |  |
| `game_id` | ``$STRING`` | No |  |
| `game_title` | ``$STRING`` | No |  |
| `price` | ``$NUMBER`` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Alert.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Alert.list(nil)
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.Alert.remove({ "id" => "alert_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AlertEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DealEntity

```ruby
deal = client.Deal
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Deal.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DealEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GameEntity

```ruby
game = client.Game
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Game.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GameEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StoreEntity

```ruby
store = client.Store
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | ``$OBJECT`` | No |  |
| `is_active` | ``$INTEGER`` | No |  |
| `store_id` | ``$STRING`` | No |  |
| `store_name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Store.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StoreEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = CheapsharkSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

