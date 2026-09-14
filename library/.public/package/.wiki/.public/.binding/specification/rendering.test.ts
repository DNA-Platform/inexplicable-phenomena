import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { placeOf } from '../rendering/place';
import { library, table, shipping } from './environment';

describe.skipIf(shipping)('rendering', () => {
    for (const route of table.routes) {
        it(`${route.address} is a page that holds its book`, () => {
            const at = placeOf(library, route);
            expect(existsSync(at), `${at} was not rendered`).toBe(true);
            const html = readFileSync(at, 'utf8');
            expect(html, 'the page left #root empty').not.toContain('<div id="root"></div>');
            expect(html).toMatch(/<div id="root">[\s\S]+<\/div>/);
        });
    }
});
