import * as fs from 'node:fs';
import * as path from 'node:path';

export interface SidebarItem {
    text: string;
    link?: string;
    items?: SidebarItem[];
    collapsed?: boolean;
}

const BLOGS_DIR = path.resolve(process.cwd(), 'blogs');

function removeExtension(filename: string): string {
    return filename.replace(/\.md$/, '');
}

function buildItems(dir: string, routePrefix: string): SidebarItem[] {
    if (!fs.existsSync(dir)) {
        return [];
    }

    return fs.readdirSync(dir, { withFileTypes: true })
        .filter(entry => {
            if (entry.name.startsWith('.')) return false;
            if (entry.isFile() && entry.name === 'index.md') return false;
            if (entry.isFile() && !entry.name.endsWith('.md')) return false;
            return true;
        })
        .sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name, 'zh-CN');
        })
        .map(entry => {
            const absolutePath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                return {
                    text: entry.name,
                    collapsed: true,
                    items: buildItems(absolutePath, `${routePrefix}/${entry.name}`)
                };
            }

            const name = removeExtension(entry.name);

            return {
                text: name,
                link: `${routePrefix}/${encodeURI(name)}`
            };
        });
}

export function createBlogSidebar(): SidebarItem[] {
    if (!fs.existsSync(BLOGS_DIR)) {
        return [];
    }

    return fs.readdirSync(BLOGS_DIR, { withFileTypes: true })
        .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
        .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
        .map(entry => ({
            text: entry.name,
            collapsed: true,
            items: buildItems(
                path.join(BLOGS_DIR, entry.name),
                `/blogs/${entry.name}`
            )
        }))
        .filter(item => item.items.length > 0);
}