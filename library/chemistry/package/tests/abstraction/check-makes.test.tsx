import { describe, it, expect } from 'vitest';
import { $, $Block, $Chemical, $check } from '../../src';

class $Kind extends $Chemical {
    said = 'stock';
}
class $Other extends $Chemical {
    said = 'other';
}
const Kind = $($Kind);
const Other = $($Other);

describe("$check makes one when asked with '!'", () => {
    it('makes one from a component', () => {
        const one = $check<$Kind>(Kind, '!');
        expect(one).toBeInstanceOf($Kind);
        expect(one.said).toBe('stock');
    });

    it('makes one from a class', () => {
        const one = $check<$Kind>($Kind as never, '!');
        expect(one).toBeInstanceOf($Kind);
    });

    it('keeps what it was handed when it fits', () => {
        const held = $(<Kind />) as $Kind;
        expect($check(held, $Kind, '!')).toBe(held);
    });

    it('makes one when what it was handed is missing', () => {
        const made = $check<$Kind>(undefined, $Kind, '!');
        expect(made).toBeInstanceOf($Kind);
    });

    it('makes one when what it was handed is the wrong kind', () => {
        const wrong = $(<Other />) as $Other;
        const made = $check(wrong as never, $Kind, '!') as $Kind;
        expect(made).toBeInstanceOf($Kind);
    });

    it('still refuses, and still validates, without the marker', () => {
        expect(() => $check(false, 'it does not hold')).toThrow('it does not hold');
        expect($check(true, 'it holds')).toBe(true);
    });
});
