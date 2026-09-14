import { join } from 'node:path';

export const placeOf = (library: string, route: { address: string; name: string }): string =>
    route.address === '/' ? join(library, 'index.html') : join(library, route.name, 'index.html');
