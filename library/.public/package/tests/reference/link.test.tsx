import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Link, Link } from '@/index';
import { test, expect } from 'vitest';

test('$Link stores a url — its view is an anchor carrying the text', () => {
    const html = renderToStaticMarkup(
        <MemoryRouter><Link url="/books/moby">Moby-Dick</Link></MemoryRouter>
    );
    expect(html).toContain('Moby-Dick');
    expect(html).toContain('href="/books/moby"');
});

test('a link finds the destination in the router\'s notation — the router does the travelling', () => {
    const l: $Link = $(<Link url="/books/moby">Moby-Dick</Link>);
    expect(l.read()).toBe('/books/moby');
    expect(l.valid()).toBe(true);
    const twin: $Link = $(<Link url="/books/moby">the whale book</Link>);
    expect(l.equals(twin)).toBe(true);
});
