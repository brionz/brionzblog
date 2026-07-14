import {
	brand,
	type Category,
	type CategorySlug,
} from '../config/brand';

export function calculateReadingMinutes(
	markdown: string,
	wordsPerMinute = 220,
): number {
	const prose = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#>*_~]/g, ' ');

	const words =
		prose.match(/[\p{L}\p{N}]+(?:['’–-][\p{L}\p{N}]+)*/gu) ?? [];

	return Math.max(1, Math.ceil(words.length / wordsPerMinute));
}

export function getCategory(slug: string): Category | undefined {
	return brand.categories.find((category) => category.slug === slug);
}

export function categoryHref(slug: CategorySlug): string {
	return `/blog/category/${slug}/`;
}
