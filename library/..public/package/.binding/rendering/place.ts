import { join } from 'node:path';

// WHERE A BOOK'S PAGE IS WRITTEN — under its ADDRESS and never under its name. A name is written the
// way a person writes it and holds spaces and punctuation; the address is the slug of it, and a
// folder on disk answering a URL is the address by definition.
export const placeOf = (face: string, route: { address: string }): string =>
    route.address === '/' ? join(face, 'index.html') : join(face, route.address.slice(1), 'index.html');
