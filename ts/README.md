# Cheapshark TypeScript SDK

The TypeScript SDK for the Cheapshark API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install cheapshark
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CheapsharkSDK } from 'cheapshark'

const client = new CheapsharkSDK({})
```

### 2. List alerts

```ts
const result = await client.Alert().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 4. Create, update, and remove

```ts
// Create
const created = await client.Alert().create({
  name: 'Example',
})

// Remove
const removed = await client.Alert().remove({
  id: created.data.id,
})
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CheapsharkSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new CheapsharkSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CheapsharkSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CHEAPSHARK_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### CheapsharkSDK

#### Constructor

```ts
new CheapsharkSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Alert(data?)` | `AlertEntity` | Create a Alert entity instance. |
| `Deal(data?)` | `DealEntity` | Create a Deal entity instance. |
| `Game(data?)` | `GameEntity` | Create a Game entity instance. |
| `Store(data?)` | `StoreEntity` | Create a Store entity instance. |
| `tester(testopts?, sdkopts?)` | `CheapsharkSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CheapsharkSDK.test(testopts?, sdkopts?)` | `CheapsharkSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CheapsharkSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Alert

| Field | Description |
| --- | --- |
| `email` |  |
| `game_id` |  |
| `game_title` |  |
| `price` |  |

Operations: create, list, remove.

API path: `/alerts`

#### Deal

| Field | Description |
| --- | --- |
| `deal_id` |  |
| `deal_rating` |  |
| `game_id` |  |
| `internal_name` |  |
| `is_on_sale` |  |
| `last_change` |  |
| `metacritic_link` |  |
| `metacritic_score` |  |
| `normal_price` |  |
| `release_date` |  |
| `sale_price` |  |
| `saving` |  |
| `steam_app_id` |  |
| `steam_rating_count` |  |
| `steam_rating_percent` |  |
| `steam_rating_text` |  |
| `store_id` |  |
| `thumb` |  |
| `title` |  |

Operations: list.

API path: `/deals`

#### Game

| Field | Description |
| --- | --- |
| `cheapest` |  |
| `cheapest_deal_id` |  |
| `external` |  |
| `game_id` |  |
| `internal_name` |  |
| `steam_app_id` |  |
| `thumb` |  |

Operations: list.

API path: `/games`

#### Store

| Field | Description |
| --- | --- |
| `image` |  |
| `is_active` |  |
| `store_id` |  |
| `store_name` |  |

Operations: list.

API path: `/stores`



## Entities


### Alert

Create an instance: `const alert = client.Alert()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `game_id` | ``$STRING`` |  |
| `game_title` | ``$STRING`` |  |
| `price` | ``$NUMBER`` |  |

#### Example: List

```ts
const alerts = await client.Alert().list()
```

#### Example: Create

```ts
const alert = await client.Alert().create({
})
```


### Deal

Create an instance: `const deal = client.Deal()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ts
const deals = await client.Deal().list()
```


### Game

Create an instance: `const game = client.Game()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ts
const games = await client.Game().list()
```


### Store

Create an instance: `const store = client.Store()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `image` | ``$OBJECT`` |  |
| `is_active` | ``$INTEGER`` |  |
| `store_id` | ``$STRING`` |  |
| `store_name` | ``$STRING`` |  |

#### Example: List

```ts
const stores = await client.Store().list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
cheapshark/
├── src/
│   ├── CheapsharkSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CheapsharkSDK } from 'cheapshark'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
