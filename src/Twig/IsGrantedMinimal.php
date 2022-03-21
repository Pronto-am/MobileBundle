<?php

namespace Pronto\MobileBundle\Twig;

use Pronto\MobileBundle\Entity\User;
use Symfony\Component\Security\Core\Security;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Twig_Function;

class IsGrantedMinimal extends AbstractExtension
{
    private array $roles = [
        'ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'
    ];

    private ?User $user = null;

    public function __construct(Security $security)
    {
        $user = $security->getUser();
        if ($user instanceof User) {
            $this->user = $user;
        }
    }

    /**
     * @return array|TwigFunction[]
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('is_granted_minimal', [$this, 'isGrantedMinimal'])
        ];
    }

    public function isGrantedMinimal(string $role): bool
    {
        if (!in_array($role, $this->roles)) {
            return false;
        }

        $userRoleIndex = null;

        // Get the highest role of the user
        foreach ($this->user->getRoles() as $userRole) {
            $index = array_search($userRole, $this->roles);
            $userRoleIndex = $index > $userRoleIndex ? $index : $userRoleIndex;
        }

        $needsRoleIndex = array_search($role, $this->roles);

        return $userRoleIndex >= $needsRoleIndex;
    }
}
