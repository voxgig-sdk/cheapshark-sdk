package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/cheapshark-sdk"
	"github.com/voxgig-sdk/cheapshark-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestAlertEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Alert(nil)
		if ent == nil {
			t.Fatal("expected non-nil AlertEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := alertBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "alert." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CHEAPSHARK_TEST_ALERT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		alertRef01Ent := client.Alert(nil)
		alertRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "alert"}, setup.data), "alert_ref01"))

		alertRef01DataResult, err := alertRef01Ent.Create(alertRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		alertRef01Data = core.ToMapAny(alertRef01DataResult)
		if alertRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		alertRef01Match := map[string]any{}

		alertRef01ListResult, err := alertRef01Ent.List(alertRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		alertRef01List, alertRef01ListOk := alertRef01ListResult.([]any)
		if !alertRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", alertRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(alertRef01List), map[string]any{"id": alertRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// REMOVE
		alertRef01MatchRm0 := map[string]any{
			"id": alertRef01Data["id"],
		}
		_, err = alertRef01Ent.Remove(alertRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		alertRef01MatchRt0 := map[string]any{}

		alertRef01ListRt0Result, err := alertRef01Ent.List(alertRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		alertRef01ListRt0, alertRef01ListRt0Ok := alertRef01ListRt0Result.([]any)
		if !alertRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", alertRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(alertRef01ListRt0), map[string]any{"id": alertRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func alertBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "alert", "AlertTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read alert test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse alert test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"alert01", "alert02", "alert03"},
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
	entidEnvRaw := os.Getenv("CHEAPSHARK_TEST_ALERT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CHEAPSHARK_TEST_ALERT_ENTID": idmap,
		"CHEAPSHARK_TEST_LIVE":      "FALSE",
		"CHEAPSHARK_TEST_EXPLAIN":   "FALSE",
		"CHEAPSHARK_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CHEAPSHARK_TEST_ALERT_ENTID"])
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
