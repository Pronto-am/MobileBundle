<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DataFixtures;

use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Pronto\MobileBundle\Entity\User;

class UserFixtures extends Fixture
{
    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('admin@example.com');
        $user->setFirstName('John');
        $user->setLastName('Doe');
        $user->setPlainPassword('admin');
        $user->setRoles(['ROLE_USER', 'ROLE_SUPER_ADMIN']);
        $user->setCreatedAt(new DateTime());
        $user->setUpdatedAt(new DateTime());

        $manager->persist($user);
        $manager->flush();

        $user->setActivationToken(null);

        $manager->persist($user);
        $manager->flush();
    }
}
