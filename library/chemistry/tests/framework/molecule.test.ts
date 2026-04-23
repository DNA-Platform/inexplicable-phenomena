import { describe, it, expect } from 'vitest';
import { $Reflection } from '@/chemistry/chemical';

// These tests pin down the framework's rules for which properties on a
// chemical are reactive. The rules define what "state" means in
// $Chemistry — and therefore what mutations trigger re-renders.

describe('Reactive property rules — which properties the framework tracks', () => {
    it('properties with a $ prefix and lowercase second character are reactive ("special" fields)', () => {
        expect($Reflection.isSpecial('$name')).toBe(true);
        expect($Reflection.isSpecial('$color')).toBe(true);
        expect($Reflection.isSpecial('$count')).toBe(true);
    });

    it('properties with a $ prefix and uppercase second character are NOT reactive (reserved for Component-like exports)', () => {
        expect($Reflection.isSpecial('$Parent')).toBe(false);
        expect($Reflection.isSpecial('$Component')).toBe(false);
    });

    it('properties prefixed with $$ or $_ are NOT reactive (internal/escape-hatch convention)', () => {
        expect($Reflection.isSpecial('$$internal')).toBe(false);
        expect($Reflection.isSpecial('$_private')).toBe(false);
    });

    it('properties prefixed with _ are NOT reactive (user-marked private)', () => {
        expect($Reflection.isReactive('_private')).toBe(false);
    });

    it('the constructor property is NOT reactive', () => {
        expect($Reflection.isReactive('constructor')).toBe(false);
    });

    it('regular properties (no special prefix) ARE reactive by default', () => {
        expect($Reflection.isReactive('count')).toBe(true);
        expect($Reflection.isReactive('items')).toBe(true);
    });
});
