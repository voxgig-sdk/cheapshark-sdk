<?php
declare(strict_types=1);

// Cheapshark SDK utility: result_body

class CheapsharkResultBody
{
    public static function call(CheapsharkContext $ctx): ?CheapsharkResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
