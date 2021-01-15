<?php

namespace Pronto\MobileBundle\Twig;


use Pronto\MobileBundle\Entity\User;
use Symfony\Component\Security\Core\Security;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Twig_Function;

class IsGrantedMinimal extends AbstractExtension
{
    /**
     * @var array $roles
     */
    private $roles = [
        'ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'
    ];

    /**
     * @var User|null $user
     */
    private $user;

    /**
     * IsGrantedMinimal constructor.
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->user = $security->getUser();
    }

    /**
     * @return array|Twig_Function[]
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('is_granted_minimal', [$this, 'isGrantedMinimal'])
        ];
    }

    /**
     * @param string $role
     * @return bool
     */
    public function isGrantedMinimal(string $role): bool
    {
        if(!in_array($role, $this->roles)) {
            return false;
        }

        $userRoleIndex = null;

        // Get the highest role of the user
        foreach($this->user->getRoles() as $userRole) {
            $index = array_search($userRole, $this->roles);
            $userRoleIndex = $index > $userRoleIndex ? $index : $userRoleIndex;
        }

        $needsRoleIndex = array_search($role, $this->roles);

        return $userRoleIndex >= $needsRoleIndex;
    }
}
