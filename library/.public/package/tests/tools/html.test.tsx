import { text } from '@/tools/html';
import { test, expect } from 'vitest';

test('text pulls a bare string', () => {
    expect(text('Moby-Dick')).toBe('Moby-Dick');
});

test('text flattens nested markup, stripping tags', () => {
    expect(text(<span>The <b>Whale</b></span>)).toBe('The Whale');
});

test('text joins arrays and drops nullish', () => {
    expect(text(['a', null, 'b', false, 'c'])).toBe('abc');
});
