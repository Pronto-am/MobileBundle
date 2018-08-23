<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Entity\Customer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class CustomerRequest
 * @package Pronto\MobileBundle\Request
 */
class CustomerRequest extends Request
{
	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $companyName;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $contactPerson;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $phoneNumber;


	/**
	 * @Assert\NotBlank()
	 * @Assert\Email()
	 * @var string
	 */
	public $email;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $primaryColor;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $secondaryColor;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $sidebarColor;


	/**
	 * @Assert\File(mimeTypes={
	 *     "image/jpeg", "image/png"
	 *     })
	 * @Assert\Image(
	 *     minWidth = 500,
	 *     maxWidth = 500,
	 *     minHeight = 120,
	 *     maxHeight = 120
	 * )
	 * @var string
	 */
	public $logo;


	/**
	 * AppUserRequest constructor.
	 */
	public function __construct()
	{
		$this->model = Customer::class;
	}


	/**
	 * @param Customer|null $entity
	 * @return Customer
	 */
	public function toEntity($entity = null): Customer
	{
		$entity = parent::toEntityByProperties($this, [
			'companyName', 'contactPerson', 'phoneNumber', 'email', 'logo', 'primaryColor', 'secondaryColor', 'sidebarColor'
		], $entity);

		return $entity;
	}


	/**
	 * @param Customer|null $entity
	 * @return CustomerRequest
	 */
	public static function fromEntity($entity = null): RequestInterface
	{
		$request = new self();

		if ($entity !== null) {
			$request->companyName = $entity->getCompanyName();
			$request->contactPerson = $entity->getContactPerson();
			$request->phoneNumber = $entity->getPhoneNumber();
			$request->email = $entity->getEmail();
			$request->primaryColor = $entity->getPrimaryColor();
			$request->secondaryColor = $entity->getSecondaryColor();
			$request->sidebarColor = $entity->getSidebarColor();
		}

		return $request;
	}
}