<?php

declare(strict_types=1);

use Rector\CodeQuality\Rector\Class_\InlineConstructorDefaultToPropertyRector;
use Rector\Config\RectorConfig;
use Rector\Doctrine\Set\DoctrineSetList;
use Rector\Set\ValueObject\LevelSetList;
use Rector\Symfony\Set\SensiolabsSetList;
use Rector\Symfony\Set\SymfonySetList;

return static function (RectorConfig $rectorConfig): void {
    //$rectorConfig->paths([
    //    __DIR__ . '/Tests',
    //    __DIR__ . '/src',
    //]);
    //
    //// register a single rule
    ////$rectorConfig->rule(InlineConstructorDefaultToPropertyRector::class);
    //
    //$rectorConfig->sets([
    //    DoctrineSetList::ANNOTATIONS_TO_ATTRIBUTES,
    //    SymfonySetList::ANNOTATIONS_TO_ATTRIBUTES,
    //]);
};
