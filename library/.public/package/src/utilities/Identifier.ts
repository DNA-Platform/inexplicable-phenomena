export class Identifier {
    slug(name: string): string {
        const said = name.toLowerCase().replace(/['’]/gu, '')
            .replace(/&/gu, ' and ').replace(/\+/gu, ' plus ').replace(/@/gu, ' at ').replace(/%/gu, ' percent ');
        return said.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/gu, '');
    }
}

export const identifier = new Identifier();
