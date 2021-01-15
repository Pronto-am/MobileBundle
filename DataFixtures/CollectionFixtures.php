<?php

namespace Pronto\MobileBundle\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Pronto\MobileBundle\Entity\Collection\Property\Type as PropertyType;
use Pronto\MobileBundle\Entity\Collection\Relationship\Type as RelationshipType;

class CollectionFixtures extends Fixture
{
	/**
	 * Load data fixtures with the passed EntityManager
	 *
	 * @param ObjectManager $manager
	 */
	public function load(ObjectManager $manager): void
	{
		$this->createRelationshipTypes($manager);

		$this->createPropertyTypes($manager);
	}


	/**
	 * Create the property types
	 *
	 * @param ObjectManager $manager
	 */
	private function createRelationshipTypes(ObjectManager $manager): void
	{
		$type = new RelationshipType();
		$type->setName('One to many');
		$type->setHasMany(true);

		$manager->persist($type);

		$type = new RelationshipType();
		$type->setName('One to one');

		$manager->persist($type);
		$manager->flush();
	}


	/**
	 * Create the property types
	 *
	 * @param ObjectManager $manager
	 */
	private function createPropertyTypes(ObjectManager $manager): void
	{
		$ordering = 0;

		$type = new PropertyType();
		$type->setType('text');
		$type->setTranslatable(true);
		$type->setOrdering(++$ordering);
		$type->setListviewCompatible(true);
		$type->setJsonListviewCompatible(true);
		$type->setConfig([
			// Input field => Attributes
			'label'        => [
				'type' => 'text',
				'name' => 'label'
			],
			'defaultValue' => [
				'type' => 'text',
				'name' => 'defaultValue',
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('multilineText');
		$type->setTranslatable(true);
		$type->setOrdering(++$ordering);
		$type->setConfig([
			'label'        => [
				'type' => 'text',
				'name' => 'label'
			],
			'defaultValue' => [
				'type' => 'textarea',
				'name' => 'defaultValue',
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('htmlText');
		$type->setTranslatable(true);
		$type->setOrdering(++$ordering);
		$type->setConfig([
			'defaultValue' => [
				'type'  => 'textarea',
				'name'  => 'defaultValue',
				'class' => 'codeflask',
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('select');
		$type->setOrdering(++$ordering);
		$type->setJsonListviewCompatible(true);
		$type->setConfig([
			'options'     => [
				'type' => 'selectOption',
				'name' => 'defaultValue'
			],
			'multiSelect' => [
				'type' => 'checkbox',
				'name' => 'multiSelect'
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('date');
		$type->setOrdering(++$ordering);
		$type->setListviewCompatible(true);
		$type->setJsonListviewCompatible(true);
		$type->setConfig([
			'defaultValue' => [
				'type'   => 'select',
				'values' => [
					'null' => 'Leeg',
					'now'  => 'Huidige datum'
				],
				'name'   => 'defaultValue'
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('dateTime');
		$type->setOrdering(++$ordering);
		$type->setListviewCompatible(true);
		$type->setJsonListviewCompatible(true);
		$type->setConfig([
			'defaultValue' => [
				'type'   => 'select',
				'values' => [
					'null' => 'Leeg',
					'now'  => 'Huidige datum'
				],
				'name'   => 'defaultValue'
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('boolean');
		$type->setOrdering(++$ordering);
		$type->setListviewCompatible(true);
		$type->setJsonListviewCompatible(true);
		$type->setConfig([
			'defaultValue' => [
				'type'   => 'select',
				'values' => [
					'true'  => 'True',
					'false' => 'False'
				],
				'name'   => 'defaultValue'
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('url');
		$type->setTranslatable(true);
		$type->setOrdering(++$ordering);
		$type->setListviewCompatible(true);
		$type->setJsonListviewCompatible(true);
		$type->setConfig([
			'defaultValue' => [
				'type' => 'text',
				'name' => 'defaultValue',
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('number');
		$type->setOrdering(++$ordering);
		$type->setListviewCompatible(true);
		$type->setJsonListviewCompatible(true);
		$type->setConfig([
			'defaultValue' => [
				'type' => 'number',
				'name' => 'defaultValue'
			],
			'min'          => [
				'type' => 'number',
				'name' => 'min'
			],
			'max'          => [
				'type' => 'number',
				'name' => 'max'
			],
			'step'         => [
				'type' => 'number',
				'name' => 'step'
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('json');
		$type->setOrdering(++$ordering);
		$type->setConfig([
			'structure' => [
				'type'         => 'textarea',
				'value'        => '',
				'name'         => 'structure',
				'codeLanguage' => 'json',
				'class'        => 'codeflask'
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('file');
		$type->setOrdering(++$ordering);
		$type->setConfig([
			'file'     => [
				'type'         => 'file',
				'name'         => 'file',
				'configurable' => false
			],
			'multiple' => [
				'type' => 'checkbox',
				'name' => 'multipleFiles'
			]
		]);

		$manager->persist($type);

		$type = new PropertyType();
		$type->setType('coordinates');
		$type->setOrdering(++$ordering);
		$type->setJsonListviewCompatible(true);
		$type->setConfig([
			'coordinates' => [
				'type'         => 'coordinates',
				'name'         => 'coordinates',
				'configurable' => false
			]
		]);

		$manager->persist($type);
		$manager->flush();
	}
}
