export class Identifier {
    slug(name: string): string {
        const said = name.toLowerCase().replace(/['’]/gu, '').replace(/&/gu, ' and ');
        return said.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/gu, '');
    }
}

export const identifier = new Identifier();
