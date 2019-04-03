<?php

namespace Pronto\MobileBundle\Twig;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\PersistentCollection;
use Pronto\MobileBundle\Utils\Collect;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class KeyBy extends AbstractExtension
{
    /**
     * @return array
     */
    public function getFilters(): array
    {
        return [
            new TwigFilter('keyBy', [$this, 'keyBy'])
        ];
    }

    /**
     * @param array|PersistentCollection|ArrayCollection $array
     * @param string $key
     * @return array
     */
    public function keyBy($array, string $key): array
    {
        if($array instanceof PersistentCollection || $array instanceof ArrayCollection) {
            $array = $array->toArray();
        }

        return Collect::keyBy($array, $key);
    }
}