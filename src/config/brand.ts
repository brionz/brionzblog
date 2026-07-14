export const CATEGORIES = [
	{
		slug: 'budaya',
		label: 'Budaya',
		description: 'Membaca kebiasaan, kota, dan hal-hal yang membentuk kita.',
		color: 'var(--color-citron)',
	},
	{
		slug: 'hidup',
		label: 'Hidup',
		description: 'Catatan tentang jeda, relasi, dan cara menjalani hari.',
		color: 'var(--color-coral)',
	},
	{
		slug: 'karya',
		label: 'Karya',
		description: 'Proses kreatif, kerja yang tak terlihat, dan keberanian membuat.',
		color: 'var(--color-archive-blue)',
	},
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category['slug'];

export const CATEGORY_SLUGS = CATEGORIES.map(
	(category) => category.slug,
) as [CategorySlug, ...CategorySlug[]];

export const brand = {
	name: 'Aksara',
	shortName: 'Aksara',
	tagline: 'Bacaan untuk kepala yang ramai',
	description:
		'Jurnal esai independen tentang budaya, hidup, dan keberanian berkarya.',
	locale: 'id-ID',
	issue: {
		label: 'Edisi 01',
		date: 'Juli 2026',
	},
	author: {
		name: 'Oka',
		role: 'Penulis & editor',
		email: 'heyo@xuiy.com',
		bio: 'Saya menulis untuk memahami hal-hal yang terlalu cepat berlalu.',
	},
	theme: {
		paper: 'oklch(98% 0.012 305)',
		field: 'oklch(89% 0.072 294)',
		ink: 'oklch(25% 0.055 318)',
		citron: 'oklch(91% 0.165 105)',
		coral: 'oklch(72% 0.175 35)',
		archiveBlue: 'oklch(80% 0.075 235)',
	},
	categories: CATEGORIES,
	nav: [
		{ label: 'Beranda', href: '/' },
		{ label: 'Esai', href: '/blog' },
		{ label: 'Tentang', href: '/about' },
	],
	social: [
		{ label: 'RSS', href: '/rss.xml' },
		{ label: 'GitHub', href: 'https://github.com/withastro/astro' },
		{ label: 'X', href: 'https://twitter.com/astrodotbuild' },
	],
	home: {
		eyebrow: 'Jurnal independen · Edisi pertama',
		headline: 'Bacaan untuk kepala yang ramai.',
		deck: 'Esai panjang tentang budaya, hidup, dan karya—ditulis pelan agar layak dibaca ulang.',
		ctaLabel: 'Baca pilihan editor',
		ctaHref: '#pilihan-editor',
	},
} as const;

export type Brand = typeof brand;
export const SITE_TITLE = brand.name;
export const SITE_DESCRIPTION = brand.description;
