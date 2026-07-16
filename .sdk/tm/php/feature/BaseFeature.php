<?php
declare(strict_types=1);

// Cheapshark SDK base feature

class CheapsharkBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CheapsharkContext $ctx, array $options): void {}
    public function PostConstruct(CheapsharkContext $ctx): void {}
    public function PostConstructEntity(CheapsharkContext $ctx): void {}
    public function SetData(CheapsharkContext $ctx): void {}
    public function GetData(CheapsharkContext $ctx): void {}
    public function GetMatch(CheapsharkContext $ctx): void {}
    public function SetMatch(CheapsharkContext $ctx): void {}
    public function PrePoint(CheapsharkContext $ctx): void {}
    public function PreSpec(CheapsharkContext $ctx): void {}
    public function PreRequest(CheapsharkContext $ctx): void {}
    public function PreResponse(CheapsharkContext $ctx): void {}
    public function PreResult(CheapsharkContext $ctx): void {}
    public function PreDone(CheapsharkContext $ctx): void {}
    public function PreUnexpected(CheapsharkContext $ctx): void {}
}
