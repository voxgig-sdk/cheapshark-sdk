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
| `email` | `string` | No | Email address for the alert |
| `gameID` | `string` | No | Game identifier |
| `gameTitle` | `string` | No | Title of the game |
| `price` | `number` | No | Target price for the alert |

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
const results = await client.Alert().list({ email: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Alert().remove({ email: 'email', game_id: 'game_id' })
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
| `cheapest` | `string` | No | Lowest price found |
| `cheapestDealID` | `string` | No | Deal ID for the cheapest price |
| `external` | `string` | No | External game title |
| `gameID` | `string` | No | Unique game identifier |
| `internalName` | `string` | No | Internal game name |
| `steamAppID` | `string` | No | Steam App ID |
| `thumb` | `string` | No | Thumbnail image URL |

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
| `images` | `Record<string, any>` | No |  |
| `isActive` | `number` | No | Whether the store is active (0 or 1) |
| `storeID` | `string` | No | Unique store identifier |
| `storeName` | `string` | No | Name of the store |

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

