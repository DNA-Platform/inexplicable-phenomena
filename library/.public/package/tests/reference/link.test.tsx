import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { Link } from '@/index';
import { test, expect } from 'vitest';

test('$Link frames with react-router — $for resolves to a real href', () => {
    const html = renderToStaticMarkup(
        <MemoryRouter><Link for="/books/moby">Moby-Dick</Link></MemoryRouter>
    );
    expect(html).toContain('Moby-Dick');
    expect(html).toContain('href="/books/moby"');
});
