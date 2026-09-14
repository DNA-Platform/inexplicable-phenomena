import { describe, it, expect } from 'vitest';
import { specifying } from './specifying';
import { binding, table, shipping } from './environment';

describe.skipIf(shipping)('library', () => {
    for (const route of table.routes) {
        it(`${route.name} specifies itself, to the letter`, () => {
            const [verdict] = specifying(binding, [route.name]);
            expect(verdict.walked).toBeGreaterThan(0);
            expect(verdict.failures).toEqual([]);
        });
    }
});
