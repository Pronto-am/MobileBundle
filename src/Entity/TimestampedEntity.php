<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Class TimestampedEntity
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\MappedSuperclass
 * @ORM\HasLifecycleCallbacks
 */
abstract class TimestampedEntity
{
	/**
	 * @ORM\Column(type="datetime")
	 *
	 * @Groups({"TimestampedEntity"})
	 */
	private $createdAt;


	/**
	 * @ORM\Column(type="datetime")
	 *
	 * @Groups({"TimestampedEntity"})
	 */
	private $updatedAt;


	/**
	 * @return DateTime
	 */
	public function getCreatedAt(): DateTime
	{
		return $this->createdAt;
	}


	/**
	 * @param DateTime $createdAt
	 */
	public function setCreatedAt(DateTime $createdAt): void
	{
		$this->createdAt = $createdAt;
	}


	/**
	 * @return DateTime
	 */
	public function getUpdatedAt(): DateTime
	{
		return $this->updatedAt;
	}


	/**
	 * @param DateTime $updatedAt
	 */
	public function setUpdatedAt(DateTime $updatedAt): void
	{
		$this->updatedAt = $updatedAt;
	}


	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist
	 */
	public function onPrePersist(): void
	{
		$this->createdAt = new \DateTime();
		$this->updatedAt = new \DateTime();
	}


	/**
	 * Triggered on pre update
	 *
	 * @ORM\PreUpdate
	 */
	public function onPreUpdate(): void
	{
		$this->updatedAt = new \DateTime();
	}
}
