<?php
declare(strict_types=1);

// Cheapshark SDK configuration

class CheapsharkConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Cheapshark",
                "slug" => "cheapshark",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://www.cheapshark.com/api/1.0",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "alert" => [],
                    "deal" => [],
                    "game" => [],
                    "store" => [],
                ],
            ],
            "entity" => [
        'alert' => [
          'fields' => [
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'short' => 'Email address for the alert',
              'format' => 'email',
            ],
            [
              'name' => 'gameID',
              'title' => 'Game Id',
              'type' => '`$STRING`',
              'short' => 'Game identifier',
            ],
            [
              'name' => 'gameTitle',
              'title' => 'Game Title',
              'type' => '`$STRING`',
              'short' => 'Title of the game',
            ],
            [
              'name' => 'price',
              'title' => 'Price',
              'type' => '`$NUMBER`',
              'short' => 'Target price for the alert',
              'format' => 'float',
            ],
          ],
          'name' => 'alert',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/alerts',
                  'segments' => [
                    [
                      'lit' => 'alerts',
                    ],
                  ],
                  'parts' => [
                    'alerts',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/alerts',
                  'segments' => [
                    [
                      'lit' => 'alerts',
                    ],
                  ],
                  'parts' => [
                    'alerts',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'email',
                        'orig' => 'email',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                    ],
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/alerts',
                  'segments' => [
                    [
                      'lit' => 'alerts',
                    ],
                  ],
                  'parts' => [
                    'alerts',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'email',
                        'orig' => 'email',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'game_id',
                        'orig' => 'game_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                      'game_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'deal' => [
          'fields' => [
            [
              'name' => 'dealID',
              'title' => 'Deal Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the deal',
            ],
            [
              'name' => 'dealRating',
              'title' => 'Deal Rating',
              'type' => '`$STRING`',
              'short' => 'Rating of the deal',
            ],
            [
              'name' => 'gameID',
              'title' => 'Game Id',
              'type' => '`$STRING`',
              'short' => 'Game identifier',
            ],
            [
              'name' => 'internalName',
              'title' => 'Internal Name',
              'type' => '`$STRING`',
              'short' => 'Internal name of the game',
            ],
            [
              'name' => 'isOnSale',
              'title' => 'Is On Sale',
              'type' => '`$STRING`',
              'short' => 'Whether the game is on sale (0 or 1)',
            ],
            [
              'name' => 'lastChange',
              'title' => 'Last Change',
              'type' => '`$INTEGER`',
              'short' => 'Unix timestamp of last price change',
            ],
            [
              'name' => 'metacriticLink',
              'title' => 'Metacritic Link',
              'type' => '`$STRING`',
              'short' => 'Link to Metacritic page',
            ],
            [
              'name' => 'metacriticScore',
              'title' => 'Metacritic Score',
              'type' => '`$STRING`',
              'short' => 'Metacritic score',
            ],
            [
              'name' => 'normalPrice',
              'title' => 'Normal Price',
              'type' => '`$STRING`',
              'short' => 'Regular price',
            ],
            [
              'name' => 'releaseDate',
              'title' => 'Release Date',
              'type' => '`$INTEGER`',
              'short' => 'Unix timestamp of release date',
            ],
            [
              'name' => 'salePrice',
              'title' => 'Sale Price',
              'type' => '`$STRING`',
              'short' => 'Current sale price',
            ],
            [
              'name' => 'savings',
              'title' => 'Savings',
              'type' => '`$STRING`',
              'short' => 'Percentage savings',
            ],
            [
              'name' => 'steamAppID',
              'title' => 'Steam App Id',
              'type' => '`$STRING`',
              'short' => 'Steam App ID',
            ],
            [
              'name' => 'steamRatingCount',
              'title' => 'Steam Rating Count',
              'type' => '`$STRING`',
              'short' => 'Number of Steam ratings',
            ],
            [
              'name' => 'steamRatingPercent',
              'title' => 'Steam Rating Percent',
              'type' => '`$STRING`',
              'short' => 'Steam rating percentage',
            ],
            [
              'name' => 'steamRatingText',
              'title' => 'Steam Rating Text',
              'type' => '`$STRING`',
              'short' => 'Steam rating description',
            ],
            [
              'name' => 'storeID',
              'title' => 'Store Id',
              'type' => '`$STRING`',
              'short' => 'Store identifier',
            ],
            [
              'name' => 'thumb',
              'title' => 'Thumb',
              'type' => '`$STRING`',
              'short' => 'Thumbnail image URL',
            ],
            [
              'name' => 'title',
              'title' => 'Title',
              'type' => '`$STRING`',
              'short' => 'Title of the game',
            ],
          ],
          'name' => 'deal',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deals',
                  'segments' => [
                    [
                      'lit' => 'deals',
                    ],
                  ],
                  'parts' => [
                    'deals',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'aaa',
                        'orig' => 'aaa',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'desc',
                        'orig' => 'desc',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'exact',
                        'orig' => 'exact',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'lower_price',
                        'orig' => 'lower_price',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'metacritic',
                        'orig' => 'metacritic',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'on_sale',
                        'orig' => 'on_sale',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'output',
                        'orig' => 'output',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'page_number',
                        'orig' => 'page_number',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 60,
                      ],
                      [
                        'name' => 'sort_by',
                        'orig' => 'sort_by',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'steam_app_id',
                        'orig' => 'steam_app_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'steam_rating',
                        'orig' => 'steam_rating',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'steamwork',
                        'orig' => 'steamwork',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'store_id',
                        'orig' => 'store_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'title',
                        'orig' => 'title',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'upper_price',
                        'orig' => 'upper_price',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'aaa',
                      'desc',
                      'exact',
                      'lower_price',
                      'metacritic',
                      'on_sale',
                      'output',
                      'page_number',
                      'page_size',
                      'sort_by',
                      'steam_app_id',
                      'steam_rating',
                      'steamwork',
                      'store_id',
                      'title',
                      'upper_price',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'game' => [
          'fields' => [
            [
              'name' => 'cheapest',
              'title' => 'Cheapest',
              'type' => '`$STRING`',
              'short' => 'Lowest price found',
            ],
            [
              'name' => 'cheapestDealID',
              'title' => 'Cheapest Deal Id',
              'type' => '`$STRING`',
              'short' => 'Deal ID for the cheapest price',
            ],
            [
              'name' => 'external',
              'title' => 'External',
              'type' => '`$STRING`',
              'short' => 'External game title',
            ],
            [
              'name' => 'gameID',
              'title' => 'Game Id',
              'type' => '`$STRING`',
              'short' => 'Unique game identifier',
            ],
            [
              'name' => 'internalName',
              'title' => 'Internal Name',
              'type' => '`$STRING`',
              'short' => 'Internal game name',
            ],
            [
              'name' => 'steamAppID',
              'title' => 'Steam App Id',
              'type' => '`$STRING`',
              'short' => 'Steam App ID',
            ],
            [
              'name' => 'thumb',
              'title' => 'Thumb',
              'type' => '`$STRING`',
              'short' => 'Thumbnail image URL',
            ],
          ],
          'name' => 'game',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/games',
                  'segments' => [
                    [
                      'lit' => 'games',
                    ],
                  ],
                  'parts' => [
                    'games',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'exact',
                        'orig' => 'exact',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 60,
                      ],
                      [
                        'name' => 'steam_app_id',
                        'orig' => 'steam_app_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'title',
                        'orig' => 'title',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'exact',
                      'limit',
                      'steam_app_id',
                      'title',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'store' => [
          'fields' => [
            [
              'name' => 'images',
              'title' => 'Images',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'isActive',
              'title' => 'Is Active',
              'type' => '`$INTEGER`',
              'short' => 'Whether the store is active (0 or 1)',
            ],
            [
              'name' => 'storeID',
              'title' => 'Store Id',
              'type' => '`$STRING`',
              'short' => 'Unique store identifier',
            ],
            [
              'name' => 'storeName',
              'title' => 'Store Name',
              'type' => '`$STRING`',
              'short' => 'Name of the store',
            ],
          ],
          'name' => 'store',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/stores',
                  'segments' => [
                    [
                      'lit' => 'stores',
                    ],
                  ],
                  'parts' => [
                    'stores',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CheapsharkFeatures::make_feature($name);
    }
}
