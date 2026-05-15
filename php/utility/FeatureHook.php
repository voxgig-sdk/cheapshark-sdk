<?php
declare(strict_types=1);

// Cheapshark SDK utility: feature_hook

class CheapsharkFeatureHook
{
    public static function call(CheapsharkContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
