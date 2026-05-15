<?php
declare(strict_types=1);

// Cheapshark SDK utility: result_headers

class CheapsharkResultHeaders
{
    public static function call(CheapsharkContext $ctx): ?CheapsharkResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
