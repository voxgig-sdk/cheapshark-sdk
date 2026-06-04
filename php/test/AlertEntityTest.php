<?php
declare(strict_types=1);

// Alert entity test

require_once __DIR__ . '/../cheapshark_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AlertEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CheapsharkSDK::test(null, null);
        $ent = $testsdk->Alert(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = alert_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "alert." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CHEAPSHARK_TEST_ALERT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $alert_ref01_ent = $client->Alert(null);
        $alert_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.alert"), "alert_ref01"));

        [$alert_ref01_data_result, $err] = $alert_ref01_ent->create($alert_ref01_data, null);
        $this->assertNull($err);
        $alert_ref01_data = Helpers::to_map($alert_ref01_data_result);
        $this->assertNotNull($alert_ref01_data);

        // LIST
        $alert_ref01_match = [];

        [$alert_ref01_list_result, $err] = $alert_ref01_ent->list($alert_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($alert_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($alert_ref01_list_result),
            ["id" => $alert_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // REMOVE
        $alert_ref01_match_rm0 = [
            "id" => $alert_ref01_data["id"],
        ];
        [$_, $err] = $alert_ref01_ent->remove($alert_ref01_match_rm0, null);
        $this->assertNull($err);

        // LIST
        $alert_ref01_match_rt0 = [];

        [$alert_ref01_list_rt0_result, $err] = $alert_ref01_ent->list($alert_ref01_match_rt0, null);
        $this->assertNull($err);
        $this->assertIsArray($alert_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($alert_ref01_list_rt0_result),
            ["id" => $alert_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function alert_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/alert/AlertTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CheapsharkSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["alert01", "alert02", "alert03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CHEAPSHARK_TEST_ALERT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CHEAPSHARK_TEST_ALERT_ENTID" => $idmap,
        "CHEAPSHARK_TEST_LIVE" => "FALSE",
        "CHEAPSHARK_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CHEAPSHARK_TEST_ALERT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["CHEAPSHARK_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new CheapsharkSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["CHEAPSHARK_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["CHEAPSHARK_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
