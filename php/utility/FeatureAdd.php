<?php
declare(strict_types=1);

// Cheapshark SDK utility: feature_add

class CheapsharkFeatureAdd
{
    public static function call(CheapsharkContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
