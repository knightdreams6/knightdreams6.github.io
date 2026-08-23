import { createContentLoader } from 'vitepress';

export interface BlogPost {
    title: string;
    url: string;
    date?: string;
    description?: string;
}

export interface BlogData {
    posts: BlogPost[];
}

declare const data: BlogData;
export { data };

export default createContentLoader('blogs/**/*.md', {
    excerpt: true,

    transform(rawData): BlogData {
        const posts = rawData
            .filter(page => page.url !== '/blogs/' && page.url !== '/blogs')
            .map(page => {
                const frontmatter = page.frontmatter;
                const pathParts = page.url.split('/').filter(Boolean);
                const fileName = decodeURIComponent(pathParts[pathParts.length - 1] ?? '');

                return {
                    title: frontmatter.title ?? fileName,
                    url: page.url,
                    date: normalizeDate(frontmatter.date),
                    description: createDescription(
                        frontmatter.description,
                        page.excerpt
                    )
                };
            });

        posts.sort((a, b) => {
            if (!a.date && !b.date) {
                return a.title.localeCompare(b.title, 'zh-CN');
            }

            if (!a.date) {
                return 1;
            }

            if (!b.date) {
                return -1;
            }

            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return {
            posts
        };
    }
});

function normalizeDate(value: unknown): string | undefined {
    if (!value) {
        return undefined;
    }

    const date = new Date(value as string | number | Date);

    if (Number.isNaN(date.getTime())) {
        return undefined;
    }

    return date.toISOString().slice(0, 10);
}

function createDescription(
    description: unknown,
    excerpt?: string
): string {
    if (typeof description === 'string' && description.trim()) {
        return description.trim();
    }

    if (!excerpt) {
        return '';
    }

    return excerpt
        .replace(/<[^>]*>/g, ' ')
        .replace(/&#8203;/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\|/g, ' ')
        .replace(/#+\s*/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 160);
}