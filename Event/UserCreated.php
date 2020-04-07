<?php


namespace Pronto\MobileBundle\Event;



use Pronto\MobileBundle\Entity\User;

class UserCreated extends Event
{
    /**
     * @var User $user
     */
    public $user;

    /**
     * UserCreated constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return String
     */
    public static function name(): String
    {
        return MobileBundleEvents::USER_CREATED;
    }
}
