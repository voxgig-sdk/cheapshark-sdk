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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'gameID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'gameTitle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'price',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'alert',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/alerts',
                  'parts' => [
                    'alerts',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'email',
                        'orig' => 'email',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/alerts',
                  'parts' => [
                    'alerts',
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'email',
                        'orig' => 'email',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'game_id',
                        'orig' => 'game_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/alerts',
                  'parts' => [
                    'alerts',
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                      'game_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'dealRating',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'gameID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'internalName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isOnSale',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastChange',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'metacriticLink',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'metacriticScore',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'normalPrice',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'releaseDate',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'salePrice',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'savings',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'steamAppID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'steamRatingCount',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'steamRatingPercent',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'steamRatingText',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'storeID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'thumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'deal',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'aaa',
                        'orig' => 'aaa',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'desc',
                        'orig' => 'desc',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'exact',
                        'orig' => 'exact',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lower_price',
                        'orig' => 'lower_price',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'metacritic',
                        'orig' => 'metacritic',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'on_sale',
                        'orig' => 'on_sale',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'output',
                        'orig' => 'output',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'page_number',
                        'orig' => 'page_number',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 60,
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sort_by',
                        'orig' => 'sort_by',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'steam_app_id',
                        'orig' => 'steam_app_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'steam_rating',
                        'orig' => 'steam_rating',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'steamwork',
                        'orig' => 'steamwork',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'store_id',
                        'orig' => 'store_id',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'title',
                        'orig' => 'title',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'upper_price',
                        'orig' => 'upper_price',
                        'type' => '`$NUMBER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deals',
                  'parts' => [
                    'deals',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cheapestDealID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'external',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'gameID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'internalName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'steamAppID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'thumb',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'game',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'exact',
                        'orig' => 'exact',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 60,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'steam_app_id',
                        'orig' => 'steam_app_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'title',
                        'orig' => 'title',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/games',
                  'parts' => [
                    'games',
                  ],
                  'select' => [
                    'exist' => [
                      'exact',
                      'limit',
                      'steam_app_id',
                      'title',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'isActive',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'storeID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'storeName',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'store',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/stores',
                  'parts' => [
                    'stores',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
