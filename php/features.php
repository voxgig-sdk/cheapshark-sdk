<?php
declare(strict_types=1);

// Cheapshark SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CheapsharkFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CheapsharkBaseFeature();
            case "test":
                return new CheapsharkTestFeature();
            default:
                return new CheapsharkBaseFeature();
        }
    }
}
