import { describe, it, expect } from 'vitest';
import * as lib from '@dna-platform/public';

// A CLASS THAT EXTENDS A HALF-BUILT BASE IS THE FAULT THIS FILE EXISTS TO CATCH.
// It used to catch it by importing each module first into a fresh graph, which is a
// promise the SOURCE can no longer keep and does not need to: kinds live in their own
// files now, so the source graph carries cycles on purpose and the bundler resolves
// them. The guarantee a consumer actually needs is made here instead, against the
// artifact they are handed — and it covers every export rather than a hand-written list.

const exported = Object.keys(lib).sort();

describe('the package a consumer is handed stands on its own', () => {
    it('and it answers with something at every name it publishes', () => {
        expect(exported.length).toBeGreaterThan(100);
        const empty = exported.filter(name => (lib as never as Record<string, unknown>)[name] === undefined);
        expect(empty).toEqual([]);
    });

    it('AND EVERY CLASS IT PUBLISHES REACHES A REAL BASE, SO NONE EXTENDS A HALF-BUILT ONE', () => {
        const held = lib as never as Record<string, unknown>;
        const broken: string[] = [];
        for (const name of exported) {
            const value = held[name];
            if (typeof value !== 'function' || !Object.prototype.hasOwnProperty.call(value, 'prototype')) continue;
            let walked: unknown = value;
            let depth = 0;
            while (typeof walked === 'function' && depth < 40) {
                walked = Object.getPrototypeOf(walked);
                depth += 1;
            }
            if (walked !== null && walked !== Function.prototype && walked !== Object.prototype) broken.push(name);
        }
        expect(broken).toEqual([]);
    });

    it('and the seven levels of composition each stand beneath the one above', () => {
        const seven: [string, string][] = [
            ['$Chapter', '$Composition'],
            ['$Section', '$Composition'],
            ['$Paragraph', '$Composition'],
            ['$Sentence', '$Composition'],
            ['$Word', '$Composition'],
            ['$Letter', '$Composition'],
            ['$Annotation', '$Writing'],
            ['$Type', '$Annotation'],
        ];
        const held = lib as never as Record<string, { prototype?: object }>;
        for (const [kind, base] of seven) {
            expect(held[kind], kind + ' is not published').toBeDefined();
            expect(held[kind].prototype, kind + ' does not stand on ' + base)
                .toBeInstanceOf(held[base] as never as Function);
        }
    });
});
