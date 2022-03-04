<?php

namespace Pronto\MobileBundle\Service;

use Awps\FontAwesome;

class FontAwesomeLoader
{
    private FontAwesome $icons;

    public function __construct()
    {
        $this->icons = new FontAwesome();
    }

    public function getAllData()
    {
        return $this->icons->getAllData();
    }

    public function getReadableNames()
    {
        return $this->icons->getReadableNames();
    }

    public function sortArrayByName()
    {
        return $this->icons->sortByName();
    }

    public function resetArrayOrder()
    {
        $this->icons->reset();

        return $this->getArray();
    }

    public function getArray()
    {
        return $this->icons->getArray();
    }
}
