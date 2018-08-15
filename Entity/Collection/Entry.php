<?php

namespace Pronto\MobileBundle\Entity\Collection;

use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Pronto\MobileBundle\Entity\TimestampedWithUserEntity;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;
use Pronto\MobileBundle\Traits\ApiEntityTrait;


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
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }


    /**
     * @return mixed
     */
    public function getCollection()
    {
        return $this->collection;
    }


    /**
     * @param mixed $collection
     */
    public function setCollection($collection)
    {
        $this->collection = $collection;
    }


    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }


    /**
     * @param mixed $data
     */
    public function setData($data)
    {
        $this->data = $data;
    }


	/**
	 * @return mixed
	 */
	public function getActive()
	{
		return $this->active;
	}


	/**
	 * @param mixed $active
	 */
	public function setActive($active)
	{
		$this->active = $active;
	}
}