<?php

namespace Pronto\MobileBundle\Entity;

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
	 * @return mixed
	 */
	public function getCreatedAt()
	{
		return $this->createdAt;
	}


	/**
	 * @param mixed $createdAt
	 */
	public function setCreatedAt($createdAt): void
	{
		$this->createdAt = $createdAt;
	}


	/**
	 * @return mixed
	 */
	public function getUpdatedAt()
	{
		return $this->updatedAt;
	}


	/**
	 * @param mixed $updatedAt
	 */
	public function setUpdatedAt($updatedAt): void
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