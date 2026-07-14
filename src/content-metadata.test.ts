/// <reference types="bun" />

import { describe, expect, test } from 'bun:test';
import { Glob } from 'bun';
import { CATEGORY_SLUGS } from './config/brand';

const files = Array.from(
	new Glob('src/content/blog/**/*.{md,mdx}').scanSync('.'),
);

describe('blog frontmatter', () => {
	for (const file of files) {
		test(`${file} has kinetic editorial metadata`, async () => {
			const source = await Bun.file(file).text();
			const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
			expect(frontmatter).toBeDefined();

			const category = frontmatter?.match(/^category:\s*['"]?([^'"\s]+)['"]?/m)?.[1];
			expect(CATEGORY_SLUGS).toContain(category as (typeof CATEGORY_SLUGS)[number]);
			expect(frontmatter).toMatch(/^featured:\s*(true|false)$/m);
			expect(frontmatter).toMatch(/^tags:\s*$/m);
		});
	}
});
