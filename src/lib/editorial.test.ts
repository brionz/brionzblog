/// <reference types="bun" />

import { describe, expect, test } from 'bun:test';
import {
	calculateReadingMinutes,
	categoryHref,
	getCategory,
} from './editorial';

describe('calculateReadingMinutes', () => {
	test('rounds 221 prose words up to two minutes', () => {
		const prose = Array.from({ length: 221 }, () => 'kata').join(' ');
		expect(calculateReadingMinutes(prose)).toBe(2);
	});

	test('ignores fenced code and inline markdown syntax', () => {
		const markdown = [
			'# Satu',
			'[dua](https://example.com) tiga',
			'```ts',
			'const ignored = "empat lima enam";',
			'```',
		].join('\n');
		expect(calculateReadingMinutes(markdown, 3)).toBe(1);
	});

	test('returns one minute for empty content', () => {
		expect(calculateReadingMinutes('')).toBe(1);
	});
});

describe('categories', () => {
	test('finds a configured category and builds its route', () => {
		expect(getCategory('budaya')?.label).toBe('Budaya');
		expect(categoryHref('budaya')).toBe('/blog/category/budaya/');
	});

	test('returns undefined for an unknown category', () => {
		expect(getCategory('tidak-ada')).toBeUndefined();
	});
});
