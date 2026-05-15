<?php
declare(strict_types=1);

// Cheapshark SDK utility: prepare_body

class CheapsharkPrepareBody
{
    public static function call(CheapsharkContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
