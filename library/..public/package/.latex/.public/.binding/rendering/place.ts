import { join } from 'node:path';

export const placeOf = (face: string, route: { address: string; name: string }): string =>
    route.address === '/' ? join(face, 'index.html') : join(face, route.name, 'index.html');
