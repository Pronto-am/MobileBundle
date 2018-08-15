<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * Class TimestampedWithUserEntity
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\MappedSuperclass
 * @ORM\HasLifecycleCallbacks
 */
abstract class TimestampedWithUserEntity
{
	/**
	 * @ORM\Column(type="datetime")
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	private $createdAt;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\User")
	 * @ORM\JoinColumn(nullable=true, onDelete="set null")
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	private $createdBy;


	/**
	 * @ORM\Column(type="datetime")
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	private $updatedAt;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\User")
	 * @ORM\JoinColumn(nullable=true, onDelete="set null")
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	private $updatedBy;


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
	public function getCreatedBy()
	{
		return $this->createdBy;
	}


	/**
	 * @param mixed $createdBy
	 */
	public function setCreatedBy($createdBy): void
	{
		$this->createdBy = $createdBy;
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
	 * @return mixed
	 */
	public function getUpdatedBy()
	{
		return $this->updatedBy;
	}


	/**
	 * @param mixed $updatedBy
	 */
	public function setUpdatedBy($updatedBy): void
	{
		$this->updatedBy = $updatedBy;
	}


	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist()
	 */
	public function onPrePersist(): void
	{
		$this->createdAt = new \DateTime();
		$this->updatedAt = new \DateTime();
	}


	/**
	 * Triggered on pre update
	 *
	 * @ORM\PreUpdate()
	 */
	public function onPreUpdate(): void
	{
		$this->updatedAt = new \DateTime();
	}
}