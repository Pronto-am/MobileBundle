<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;

use Pronto\MobileBundle\Traits\SerializeEntities;
use Pronto\MobileBundle\Traits\UseBundleConfiguration;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiController extends AbstractController
{
	use UseBundleConfiguration, SerializeEntities;
}
