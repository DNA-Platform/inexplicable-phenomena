import { describe, it } from 'vitest';
import { shipping } from './environment';

// STUB — Sprint 70 U5. Every reference a chapter writes resolves against the route table.
describe.skipIf(shipping)('references', () => {
    it.skip('every reference resolves — waits on resolution/references (Sprint 70 U5)', () => {});
});
