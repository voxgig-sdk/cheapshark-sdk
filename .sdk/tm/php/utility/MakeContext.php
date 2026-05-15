<?php
declare(strict_types=1);

// Cheapshark SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CheapsharkMakeContext
{
    public static function call(array $ctxmap, ?CheapsharkContext $basectx): CheapsharkContext
    {
        return new CheapsharkContext($ctxmap, $basectx);
    }
}
