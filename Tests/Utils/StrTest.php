<?php

namespace Pronto\MobileBundle\Tests\Utils;

use Pronto\MobileBundle\Utils\Str;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class StrTest extends TestCase
{
	/**
	 * Test the conversion of a string to camelCase
	 */
	public function testConvertToCamelCase(): void
	{
		$string = 'convert_to_camel_case';

		$camelCase = Str::toCamelCase($string);
		$camelCaseWithUpperCaseFirst = Str::toCamelCase($string, '_', false);

		$this->assertEquals('convertToCamelCase', $camelCase);
		$this->assertEquals('ConvertToCamelCase', $camelCaseWithUpperCaseFirst);
	}
}