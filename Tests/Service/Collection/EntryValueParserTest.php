<?php

namespace Pronto\MobileBundle\Tests\Service\Collection;

use PHPUnit\Framework\TestCase;
use Pronto\MobileBundle\Entity\Collection\Property\Type;
use Pronto\MobileBundle\Service\Collection\EntryValueParser;
use Pronto\MobileBundle\Service\JsonTranslator;
use Pronto\MobileBundle\Tests\Mocks\ApplicationMock;
use Symfony\Component\Translation\Translator;

class EntryValueParserTest extends TestCase
{
	/** @var \PHPUnit_Framework_MockObject_MockObject $jsonTranslator */
	private $jsonTranslator;

	/** @var \PHPUnit_Framework_MockObject_MockObject $translator */
	private $translator;

	/** @var ApplicationMock $applicationMock */
	private $applicationMock;


	/**
	 * Set up the collection
	 */
	public function setUp()
	{
		$this->createJsonTranslationService();

		$this->createTranslator();

		$this->applicationMock = new ApplicationMock();
	}


	/**
	 * Test parsing text
	 */
	public function testTextParser(): void
	{
		// Set up a list of users to return
		$this->jsonTranslator->expects($this->once())->method('getTranslation')->willReturn('Translatable text');
		$this->translator->expects($this->never())->method('trans')->willReturn('');

		/** @noinspection PhpParamsInspection */
		$entryValueParser = new EntryValueParser($this->translator, $this->jsonTranslator);
		$value = $entryValueParser->parse($this->applicationMock->getCollectionPropertyType(Type::TYPE_TEXT, true), ['en' => 'Translatable text']);

		$this->assertEquals('Translatable text', $value);
	}


	/**
	 * Create the json translation service
	 */
	private function createJsonTranslationService(): void
	{
		// Define the json translator service
		$this->jsonTranslator = $this->getMockBuilder(JsonTranslator::class)
			->setMethods(['getTranslation'])
			->disableOriginalConstructor()
			->getMock();
	}


	/**
	 * Create the symfony translator
	 */
	private function createTranslator(): void
	{
		// Define the json translator service
		$this->translator = $this->getMockBuilder(Translator::class)
			->setMethods(['trans'])
			->disableOriginalConstructor()
			->getMock();
	}
}