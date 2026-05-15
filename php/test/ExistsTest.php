<?php
declare(strict_types=1);

// Cheapshark SDK exists test

require_once __DIR__ . '/../cheapshark_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CheapsharkSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
