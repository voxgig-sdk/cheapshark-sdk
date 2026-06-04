# Cheapshark Python SDK

The Python SDK for the Cheapshark API. Provides an entity-oriented interface following Pythonic conventions.


## Install
```bash
pip install cheapshark-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from cheapshark_sdk import CheapsharkSDK

client = CheapsharkSDK({})
```

### 2. List alerts

```python
result, err = client.Alert(None).list(None, None)
if err:
    raise Exception(err)

if isinstance(result, list):
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
```

### 4. Create, update, and remove

```python
# Create
created, _ = client.Alert(None).create({"name": "Example"}, None)

# Remove
client.Alert(None).remove({"id": created["id"]}, None)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = CheapsharkSDK.test(None, None)

result, err = client.Cheapshark(None).load(
    {"id": "test01"}, None
)
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = CheapsharkSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### CheapsharkSDK

```python
from cheapshark_sdk import CheapsharkSDK

client = CheapsharkSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = CheapsharkSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### CheapsharkSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `Alert` | `(data) -> AlertEntity` | Create a Alert entity instance. |
| `Deal` | `(data) -> DealEntity` | Create a Deal entity instance. |
| `Game` | `(data) -> GameEntity` | Create a Game entity instance. |
| `Store` | `(data) -> StoreEntity` | Create a Store entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Alert

| Field | Description |
| --- | --- |
| `email` |  |
| `game_id` |  |
| `game_title` |  |
| `price` |  |

Operations: Create, List, Remove.

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

Operations: List.

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

Operations: List.

API path: `/games`

#### Store

| Field | Description |
| --- | --- |
| `image` |  |
| `is_active` |  |
| `store_id` |  |
| `store_name` |  |

Operations: List.

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
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── cheapshark_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`cheapshark_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
