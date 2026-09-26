export class Identifier {
    slug(name: string): string {
        const said = name.toLowerCase().replace(/['’]/gu, '').replace(/&/gu, ' and ');
        return said.replace(/[^a-z0-9]+/gu, '-').replace(/^-+|-+$/gu, '');
    }
}

export const identifier = new Identifier();
