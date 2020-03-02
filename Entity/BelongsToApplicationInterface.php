<?php


namespace Pronto\MobileBundle\Entity;


interface BelongsToApplicationInterface
{
    /**
     * @return Application
     */
    public function getApplication(): Application;

    /**
     * @param Application $application
     * @return BelongsToApplicationInterface
     */
    public function setApplication(Application $application): BelongsToApplicationInterface;
}
