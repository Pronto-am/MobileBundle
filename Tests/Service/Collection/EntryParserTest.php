<?php

namespace Pronto\MobileBundle\Tests\Service\Collection;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use PHPUnit\Framework\TestCase;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Repository\UserRepository;
use Pronto\MobileBundle\Service\Collection\EntryParser;
use Pronto\MobileBundle\Tests\Mocks\ApplicationMock;

class EntryParserTest extends TestCase
{
	/** @var Collection $collection */
	private $collection;

	/** @var EntityManager $entityManager */
	private $entityManager;

	/** @var ApplicationMock $applicationMock */
	private $applicationMock;


	/**
	 * Set up the collection
	 */
	public function setUp()
	{
		$this->createCollection();

		$this->createEntityManager();

		$this->applicationMock = new ApplicationMock();
	}


	/**
	 * Test getting a single entry
	 */
	public function testParseSingleEntryWithTranslatableProperty(): void
	{
		$propertyString = new Collection\Property();
		$propertyString->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_TEXT, true));
		$propertyString->setIdentifier('text');
		$propertyString->setName('Text');
		$propertyString->setCollection($this->collection);

		$propertyMultiline = new Collection\Property();
		$propertyMultiline->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_MULTILINE_TEXT, true));
		$propertyMultiline->setIdentifier('multiline');
		$propertyMultiline->setName('Multiline');
		$propertyMultiline->setCollection($this->collection);

		$propertyHtml = new Collection\Property();
		$propertyHtml->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_HTML_TEXT, true));
		$propertyHtml->setIdentifier('html');
		$propertyHtml->setName('Html');
		$propertyHtml->setCollection($this->collection);

		$propertyUrl = new Collection\Property();
		$propertyUrl->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_URL, true));
		$propertyUrl->setIdentifier('url');
		$propertyUrl->setName('Url');
		$propertyUrl->setCollection($this->collection);

		$this->collection->setProperties(new ArrayCollection([$propertyString, $propertyMultiline, $propertyHtml, $propertyUrl]));

		// The result from the database
		$entryResults = $this->getBaseEntryResults();
		$entryResults[0]['text'] = '{"en":"E-sites"}';
		$entryResults[0]['multiline'] = '{"en":"E-sites in a multiline text field"}';
		$entryResults[0]['html'] = '{"en":"<html><head><title></title></head><body>This is HTML</body></html>"}';
		$entryResults[0]['url'] = '{"en":"http:\/\/e-sites.nl"}';

		/** @noinspection PhpParamsInspection */
		$entryParser = new EntryParser($this->entityManager);
		$entryParser->setCollection($this->collection);
		[$entry] = $entryParser->parse($entryResults);

		// Results should be:
		$entryShouldBe = [
			'id'         => '99cc16d8-9fa3-11e8-a7e3-080027623c19',
			'created_at' => '2018-08-14T11:22:44+00:00',
			'updated_at' => '2018-08-14T11:22:44+00:00',
			'created_by' => [
				'id'         => 1,
				'first_name' => 'Thomas',
				'insertion'  => null,
				'last_name'  => 'Roovers',
				'full_name'  => 'Thomas Roovers',
				'created_at' => '2018-08-12T12:32:43+02:00',
				'updated_at' => '2018-08-12T14:32:43+02:00'
			],
			'updated_by' => [
				'id'         => 1,
				'first_name' => 'Thomas',
				'insertion'  => null,
				'last_name'  => 'Roovers',
				'full_name'  => 'Thomas Roovers',
				'created_at' => '2018-08-12T12:32:43+02:00',
				'updated_at' => '2018-08-12T14:32:43+02:00'
			],
			'text'       => [
				'en' => 'E-sites'
			],
			'multiline'  => [
				'en' => 'E-sites in a multiline text field'
			],
			'html'       => [
				'en' => '<html><head><title></title></head><body>This is HTML</body></html>'
			],
			'url'        => [
				'en' => 'http://e-sites.nl'
			]
		];

		$this->assertEquals([], array_diff(array_keys($entry), array_keys($entryShouldBe)));
		$this->assertEquals($entryShouldBe['created_by'], $entry['created_by']);
		$this->assertEquals($entryShouldBe['updated_by'], $entry['updated_by']);
		$this->assertEquals($entryShouldBe['text'], $entry['text']);
		$this->assertEquals($entryShouldBe['multiline'], $entry['multiline']);
		$this->assertEquals($entryShouldBe['html'], $entry['html']);
		$this->assertEquals($entryShouldBe['url'], $entry['url']);
	}


	/**
	 * Test getting a single entry
	 */
	public function testParseSingleEntryWithDateProperty(): void
	{
		$propertyVisited = new Collection\Property();
		$propertyVisited->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_DATE));
		$propertyVisited->setIdentifier('visited');
		$propertyVisited->setName('Visited');
		$propertyVisited->setCollection($this->collection);

		$propertyVisitedAt = new Collection\Property();
		$propertyVisitedAt->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_DATE_TIME));
		$propertyVisitedAt->setIdentifier('visited_at');
		$propertyVisitedAt->setName('Visited at');
		$propertyVisitedAt->setCollection($this->collection);

		$this->collection->setProperties(new ArrayCollection([$propertyVisited, $propertyVisitedAt]));

		// The result from the database
		$entryResults = $this->getBaseEntryResults();
		$entryResults[0]['created_by_id'] = '2';
		$entryResults[0]['updated_by_id'] = '2';
		$entryResults[0]['visited'] = '14-08-2018';
		$entryResults[0]['visited_at'] = '2018-08-14 15:00:00';

		/** @noinspection PhpParamsInspection */
		$entryParser = new EntryParser($this->entityManager);
		$entryParser->setCollection($this->collection);
		[$entry] = $entryParser->parse($entryResults);

		// Results should be:
		$entryShouldBe = [
			'id'         => '99cc16d8-9fa3-11e8-a7e3-080027623c19',
			'created_at' => '2018-08-14T11:22:44+00:00',
			'updated_at' => '2018-08-14T11:22:44+00:00',
			'created_by' => null,
			'updated_by' => null,
			'visited'    => '14-08-2018',
			'visited_at' => '2018-08-14T15:00:00+02:00'
		];

		$this->assertEquals([], array_diff(array_keys($entry), array_keys($entryShouldBe)));
		$this->assertEquals($entryShouldBe['created_by'], $entry['created_by']);
		$this->assertEquals($entryShouldBe['updated_by'], $entry['updated_by']);
		$this->assertEquals($entryShouldBe['visited'], $entry['visited']);
		$this->assertEquals($entryShouldBe['visited_at'], $entry['visited_at']);
	}


	/**
	 * Test getting a single entry
	 */
	public function testParseSingleEntryWithSelectProperty(): void
	{
		$property = new Collection\Property();
		$property->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_SELECT));
		$property->setIdentifier('select');
		$property->setName('Select');
		$property->setCollection($this->collection);

		$this->collection->setProperties(new ArrayCollection([$property]));

		// The result from the database
		$entryResults = $this->getBaseEntryResults();
		$entryResults[0]['created_by_id'] = '2';
		$entryResults[0]['updated_by_id'] = '2';
		$entryResults[0]['select'] = '1';

		/** @noinspection PhpParamsInspection */
		$entryParser = new EntryParser($this->entityManager);
		$entryParser->setCollection($this->collection);
		[$entry] = $entryParser->parse($entryResults);

		// Results should be:
		$entryShouldBe = [
			'id'         => '99cc16d8-9fa3-11e8-a7e3-080027623c19',
			'created_at' => '2018-08-14T11:22:44+00:00',
			'updated_at' => '2018-08-14T11:22:44+00:00',
			'created_by' => null,
			'updated_by' => null,
			'select'     => '1'
		];

		$this->assertEquals([], array_diff(array_keys($entry), array_keys($entryShouldBe)));
		$this->assertEquals($entryShouldBe['select'], $entry['select']);
	}


	/**
	 * Test getting a single entry
	 */
	public function testParseSingleEntryWithBooleanProperty(): void
	{
		$propertyTrue = new Collection\Property();
		$propertyTrue->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_BOOLEAN));
		$propertyTrue->setIdentifier('boolean_true');
		$propertyTrue->setName('Boolean true');
		$propertyTrue->setCollection($this->collection);

		$propertyFalse = new Collection\Property();
		$propertyFalse->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_BOOLEAN));
		$propertyFalse->setIdentifier('boolean_false');
		$propertyFalse->setName('Boolean false');
		$propertyFalse->setCollection($this->collection);

		$this->collection->setProperties(new ArrayCollection([$propertyTrue, $propertyFalse]));

		// The result from the database
		$entryResults = $this->getBaseEntryResults();
		$entryResults[0]['created_by_id'] = '2';
		$entryResults[0]['updated_by_id'] = '2';
		$entryResults[0]['boolean_true'] = 'true';
		$entryResults[0]['boolean_false'] = 'false';

		/** @noinspection PhpParamsInspection */
		$entryParser = new EntryParser($this->entityManager);
		$entryParser->setCollection($this->collection);
		[$entry] = $entryParser->parse($entryResults);

		// Results should be:
		$entryShouldBe = [
			'id'            => '99cc16d8-9fa3-11e8-a7e3-080027623c19',
			'created_at'    => '2018-08-14T11:22:44+00:00',
			'updated_at'    => '2018-08-14T11:22:44+00:00',
			'created_by'    => null,
			'updated_by'    => null,
			'boolean_true'  => true,
			'boolean_false' => false
		];

		$this->assertEquals([], array_diff(array_keys($entry), array_keys($entryShouldBe)));
		$this->assertEquals($entryShouldBe['boolean_true'], $entry['boolean_true']);
		$this->assertEquals($entryShouldBe['boolean_false'], $entry['boolean_false']);
	}


	/**
	 * Test getting a single entry
	 */
	public function testParseSingleEntryWithNumberProperty(): void
	{
		$propertyNumber = new Collection\Property();
		$propertyNumber->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_NUMBER));
		$propertyNumber->setIdentifier('number');
		$propertyNumber->setName('Number');
		$propertyNumber->setCollection($this->collection);

		$this->collection->setProperties(new ArrayCollection([$propertyNumber]));

		// The result from the database
		$entryResults = $this->getBaseEntryResults();
		$entryResults[0]['created_by_id'] = '2';
		$entryResults[0]['updated_by_id'] = '2';
		$entryResults[0]['number'] = '1.234567890';
		$entryResults[0]['number_negative'] = '-1.234567890';

		/** @noinspection PhpParamsInspection */
		$entryParser = new EntryParser($this->entityManager);
		$entryParser->setCollection($this->collection);
		[$entry] = $entryParser->parse($entryResults);

		// Results should be:
		$entryShouldBe = [
			'id'              => '99cc16d8-9fa3-11e8-a7e3-080027623c19',
			'created_at'      => '2018-08-14T11:22:44+00:00',
			'updated_at'      => '2018-08-14T11:22:44+00:00',
			'created_by'      => null,
			'updated_by'      => null,
			'number'          => 1.234567890,
			'number_negative' => -1.234567890
		];

		$this->assertEquals([], array_diff(array_keys($entry), array_keys($entryShouldBe)));
		$this->assertEquals($entryShouldBe['number'], $entry['number']);
		$this->assertEquals($entryShouldBe['number_negative'], $entry['number_negative']);
	}


	/**
	 * Test getting a single entry
	 */
	public function testParseSingleEntryWithJsonProperty(): void
	{
		$propertyJson = new Collection\Property();
		$propertyJson->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_JSON));
		$propertyJson->setIdentifier('json');
		$propertyJson->setName('Json');
		$propertyJson->setCollection($this->collection);

		$propertyCoordinates = new Collection\Property();
		$propertyCoordinates->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_COORDINATES));
		$propertyCoordinates->setIdentifier('coordinates');
		$propertyCoordinates->setName('Coordinates');
		$propertyCoordinates->setCollection($this->collection);

		$this->collection->setProperties(new ArrayCollection([$propertyJson, $propertyCoordinates]));

		// The result from the database
		$entryResults = $this->getBaseEntryResults();
		$entryResults[0]['created_by_id'] = '2';
		$entryResults[0]['updated_by_id'] = '2';
		$entryResults[0]['json'] = '{"property":"value","object":{"property":"value"},"array":[{"property":"value"}]}';
		$entryResults[0]['coordinates'] = '{"address":"Lunetstraat 88, 4814 AL Breda, Nederland","latitude":"51.5904382","longitude":"4.759544300000016"}';

		/** @noinspection PhpParamsInspection */
		$entryParser = new EntryParser($this->entityManager);
		$entryParser->setCollection($this->collection);
		[$entry] = $entryParser->parse($entryResults);

		// Results should be:
		$entryShouldBe = [
			'id'          => '99cc16d8-9fa3-11e8-a7e3-080027623c19',
			'created_at'  => '2018-08-14T11:22:44+00:00',
			'updated_at'  => '2018-08-14T11:22:44+00:00',
			'created_by'  => null,
			'updated_by'  => null,
			'json'        => [
				'property' => 'value',
				'object'   => [
					'property' => 'value'
				],
				'array'    => [
					[
						'property' => 'value'
					]
				]
			],
			'coordinates' => [
				'address'   => 'Lunetstraat 88, 4814 AL Breda, Nederland',
				'latitude'  => '51.5904382',
				'longitude' => '4.759544300000016'
			]
		];

		$this->assertEquals([], array_diff(array_keys($entry), array_keys($entryShouldBe)));
		$this->assertEquals($entryShouldBe['json'], $entry['json']);
		$this->assertEquals($entryShouldBe['coordinates'], $entry['coordinates']);
	}


	/**
	 * Test getting a single entry
	 */
	public function testParseSingleEntryWithFileProperty(): void
	{
		$propertyNumber = new Collection\Property();
		$propertyNumber->setType($this->applicationMock->getCollectionPropertyType(Collection\Property\Type::TYPE_FILE));
		$propertyNumber->setIdentifier('file');
		$propertyNumber->setName('File');
		$propertyNumber->setCollection($this->collection);

		$this->collection->setProperties(new ArrayCollection([$propertyNumber]));

		// The result from the database
		$entryResults = $this->getBaseEntryResults();
		$entryResults[0]['created_by_id'] = '2';
		$entryResults[0]['updated_by_id'] = '2';
		$entryResults[0]['file'] = '["eebf0faf8198de525ecccd9f4ed42126.png","f3609eba9b1d8a80b3415372ad4c5a0d.png"]';

		/** @noinspection PhpParamsInspection */
		$entryParser = new EntryParser($this->entityManager);
		$entryParser->setCollection($this->collection);
		[$entry] = $entryParser->parse($entryResults);

		// Results should be:
		$entryShouldBe = [
			'id'         => '99cc16d8-9fa3-11e8-a7e3-080027623c19',
			'created_at' => '2018-08-14T11:22:44+00:00',
			'updated_at' => '2018-08-14T11:22:44+00:00',
			'created_by' => null,
			'updated_by' => null,
			'file'       => [
				'eebf0faf8198de525ecccd9f4ed42126.png', 'f3609eba9b1d8a80b3415372ad4c5a0d.png'
			]
		];

		$this->assertEquals([], array_diff(array_keys($entry), array_keys($entryShouldBe)));
		$this->assertEquals($entryShouldBe['file'], $entry['file']);
	}


	/**
	 * Create the collection with properties and entry
	 */
	private function createCollection(): void
	{
		$customer = new Customer();

		$application = new Application();
		$application->setCustomer($customer);

		$applicationVersion = new Application\Version();
		$applicationVersion->setApplication($application);

		$this->collection = new Collection();
		$this->collection->setApplicationVersion($applicationVersion);
		$this->collection->setIdentifier('locations');
	}


	/**
	 * Get the base entry results
	 *
	 * @return array
	 */
	private function getBaseEntryResults(): array
	{
		return [
			[
				'id'            => '99cc16d8-9fa3-11e8-a7e3-080027623c19',
				'created_at'    => '2018-08-14 11:22:44',
				'updated_at'    => '2018-08-14 11:22:44',
				'created_by_id' => '1',
				'updated_by_id' => '1',
			]
		];
	}


	/**
	 * Create the entity manager and user repository
	 */
	private function createEntityManager(): void
	{
		// Define the user repository
		$userRepository = $this->getMockBuilder(UserRepository::class)
			->setMethods(['findAllByCustomer'])
			->disableOriginalConstructor()
			->getMock();

		// Set up a list of users to return
		$userRepository->expects($this->once())->method('findAllByCustomer')->willReturn([
			[
				'id'         => 1,
				'first_name' => 'Thomas',
				'insertion'  => null,
				'last_name'  => 'Roovers',
				'full_name'  => 'Thomas Roovers',
				'created_at' => new DateTime('2018-08-12 12:32:43'),
				'updated_at' => new DateTime('2018-08-12 14:32:43')
			]
		]);

		// Pass the repository to the entity manager
		$this->entityManager = $this->getMockBuilder(EntityManager::class)
			->setMethods(['getRepository'])
			->disableOriginalConstructor()
			->getMockForAbstractClass();

		$this->entityManager->expects($this->once())->method('getRepository')->with(User::class)->willReturn($userRepository);
	}
}