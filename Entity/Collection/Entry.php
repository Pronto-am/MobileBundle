<?php

namespace Pronto\MobileBundle\Entity\Collection;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\TimestampedWithUserEntity;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * Class Entry
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\Collection\EntryRepository")
 * @ORM\Table(name="collection_entries")
 * @ORM\HasLifecycleCallbacks
 */
class Entry extends TimestampedWithUserEntity implements ApiEntityInterface
{
	use ApiEntityTrait;


	/**
     * @ORM\Id
     * @ORM\Column(type="string")
	 *
	 * @Groups({"Entry"})
     */
    private $id;


    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection", inversedBy="entries")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $collection;


    /**
     * @ORM\Column(type="json_array")
	 *
	 * @Groups({"Entry"})
     */
    private $data;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $active = true;


	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist
	 * @throws \Exception
	 */
	public function onPrePersist(): void
	{
		parent::onPrePersist();

		$this->id = Uuid::uuid1()->toString();
	}


	/**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }


    /**
     * @return Collection
     */
    public function getCollection(): Collection
    {
        return $this->collection;
    }


    /**
     * @param Collection $collection
     */
    public function setCollection(Collection $collection)
    {
        $this->collection = $collection;
    }


    /**
     * @return array
     */
    public function getData(): array
    {
        return $this->data;
    }


    /**
     * @param array $data
     */
    public function setData(array $data)
    {
        $this->data = $data;
    }


	/**
	 * @return bool
	 */
	public function getActive(): bool
	{
		return $this->active;
	}


	/**
	 * @param bool $active
	 */
	public function setActive(bool $active)
	{
		$this->active = $active;
	}
}