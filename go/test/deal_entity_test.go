package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/cheapshark-sdk/go"
	"github.com/voxgig-sdk/cheapshark-sdk/go/core"

	vs "github.com/voxgig-sdk/cheapshark-sdk/go/utility/struct"
)

func TestDealEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Deal(nil)
		if ent == nil {
			t.Fatal("expected non-nil DealEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := dealBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "deal." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CHEAPSHARK_TEST_DEAL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		dealRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.deal", setup.data)))
		var dealRef01Data map[string]any
		if len(dealRef01DataRaw) > 0 {
			dealRef01Data = core.ToMapAny(dealRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = dealRef01Data

		// LIST
		dealRef01Ent := client.Deal(nil)
		dealRef01Match := map[string]any{}

		dealRef01ListResult, err := dealRef01Ent.List(dealRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, dealRef01ListOk := dealRef01ListResult.([]any)
		if !dealRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", dealRef01ListResult)
		}

	})
}

func dealBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "deal", "DealTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read deal test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse deal test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"deal01", "deal02", "deal03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CHEAPSHARK_TEST_DEAL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CHEAPSHARK_TEST_DEAL_ENTID": idmap,
		"CHEAPSHARK_TEST_LIVE":      "FALSE",
		"CHEAPSHARK_TEST_EXPLAIN":   "FALSE",
		"CHEAPSHARK_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CHEAPSHARK_TEST_DEAL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CHEAPSHARK_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CHEAPSHARK_APIKEY"],
			},
			extra,
		})
		client = sdk.NewCheapsharkSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CHEAPSHARK_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CHEAPSHARK_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
