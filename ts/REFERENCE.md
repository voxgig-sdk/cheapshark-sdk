# Cheapshark TypeScript SDK Reference

Complete API reference for the Cheapshark TypeScript SDK.


## CheapsharkSDK

### Constructor

```ts
new CheapsharkSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CheapsharkSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CheapsharkSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CheapsharkSDK` instance in test mode.


### Instance Methods

#### `Alert(data?: object)`

Create a new `Alert` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AlertEntity` instance.

#### `Deal(data?: object)`

Create a new `Deal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DealEntity` instance.

#### `Game(data?: object)`

Create a new `Game` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GameEntity` instance.

#### `Store(data?: object)`

Create a new `Store` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StoreEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CheapsharkSDK.test()`.

**Returns:** `CheapsharkSDK` instance in test mode.


---

## AlertEntity

```ts
const alert = client.Alert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | No |  |
| `game_id` | ``$STRING`` | No |  |
| `game_title` | ``$STRING`` | No |  |
| `price` | ``$NUMBER`` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Alert().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Alert().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Alert().remove({ id: 'alert_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AlertEntity` instance with the same client and
options.

#### `client()`

Return the parent `CheapsharkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DealEntity

```ts
const deal = client.Deal()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Deal().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DealEntity` instance with the same client and
options.

#### `client()`

Return the parent `CheapsharkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GameEntity

```ts
const game = client.Game()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Game().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GameEntity` instance with the same client and
options.

#### `client()`

Return the parent `CheapsharkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StoreEntity

```ts
const store = client.Store()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | ``$OBJECT`` | No |  |
| `is_active` | ``$INTEGER`` | No |  |
| `store_id` | ``$STRING`` | No |  |
| `store_name` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Store().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StoreEntity` instance with the same client and
options.

#### `client()`

Return the parent `CheapsharkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CheapsharkSDK({
  feature: {
    test: { active: true },
  }
})
```

