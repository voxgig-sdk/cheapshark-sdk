# Cheapshark SDK

Compare digital PC game prices across Steam, GreenManGaming, Fanatical and other major stores

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About CheapShark API

[CheapShark](https://www.cheapshark.com/) is a price comparison site for digital PC games. The public API exposes the same catalogue of deals, games and stores that powers the website, so you can build trackers, browser extensions, bots and dashboards on top of it.

What you get from the API:
- Current and historical deals across multiple digital storefronts (Steam, GreenManGaming, Fanatical and others)
- Game metadata with cross-store price information
- The list of stores CheapShark tracks, including store IDs used elsewhere in the API
- Price-drop alert subscriptions tied to an email address

Operational notes: the API is served from `https://www.cheapshark.com/api/1.0` and has CORS enabled, so it can be called directly from browser apps. No API key or authentication is documented.

## Try it

**TypeScript**
```bash
npm install cheapshark
```

**Python**
```bash
pip install cheapshark-sdk
```

**PHP**
```bash
composer require voxgig/cheapshark-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/cheapshark-sdk/go
```

**Ruby**
```bash
gem install cheapshark-sdk
```

**Lua**
```bash
luarocks install cheapshark-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CheapsharkSDK } from 'cheapshark'

const client = new CheapsharkSDK({})

// List all alerts
const alerts = await client.Alert().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o cheapshark-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "cheapshark": {
      "command": "/abs/path/to/cheapshark-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Alert** | Email-based price alert subscriptions that notify a user when a tracked game drops to a target price. | `/alerts` |
| **Deal** | An individual store listing for a game at a specific price, including sale price, retail price, savings and the store it comes from. | `/deals` |
| **Game** | A PC game record with title, cover art and the set of deals currently available for it across tracked stores. | `/games` |
| **Store** | A digital storefront tracked by CheapShark (e.g. Steam, GreenManGaming, Fanatical), with the store ID used to reference it in deal and game responses. | `/stores` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from cheapshark_sdk import CheapsharkSDK

client = CheapsharkSDK({})

# List all alerts
alerts, err = client.Alert(None).list(None, None)
```

### PHP

```php
<?php
require_once 'cheapshark_sdk.php';

$client = new CheapsharkSDK([]);

// List all alerts
[$alerts, $err] = $client->Alert(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/cheapshark-sdk/go"

client := sdk.NewCheapsharkSDK(map[string]any{})

// List all alerts
alerts, err := client.Alert(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Cheapshark_sdk"

client = CheapsharkSDK.new({})

# List all alerts
alerts, err = client.Alert(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("cheapshark_sdk")

local client = sdk.new({})

-- List all alerts
local alerts, err = client:Alert(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CheapsharkSDK.test()
const result = await client.Alert().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CheapsharkSDK.test(None, None)
result, err = client.Alert(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CheapsharkSDK::test(null, null);
[$result, $err] = $client->Alert(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Alert(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CheapsharkSDK.test(nil, nil)
result, err = client.Alert(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Alert(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the CheapShark API

- Upstream: [https://www.cheapshark.com/](https://www.cheapshark.com/)
- API docs: [https://apidocs.cheapshark.com/](https://apidocs.cheapshark.com/)

---

Generated from the CheapShark API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
