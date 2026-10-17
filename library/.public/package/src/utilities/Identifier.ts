const joiners = /[‌‍]/u;
const apostrophes = /['’‘ʼ`´]/gu;
const signs: [RegExp, string][] = [
    [/&/gu, ' and '],
    [/\+/gu, ' plus '],
    [/@/gu, ' at '],
    [/%/gu, ' percent '],
    [/≠/gu, ' not equals '],
    [/=/gu, ' equals '],
    [/(?<=\p{L})#(?![\p{L}\p{N}])/gu, ' sharp '],
];
const words = /[\p{L}\p{N}][\p{L}\p{N}\p{Mn}\p{Mc}]*/gu;

export class Identifier {
    normalized(text: string): string {
        const spaced = text.normalize('NFC').replace(/\s+/gu, ' ');
        const seen = spaced.replace(/[\p{Cc}\p{Cf}]/gu, (one, at: number) =>
            joiners.test(one) && /\p{L}\p{M}*$/u.test(spaced.slice(0, at)) && /^\p{L}/u.test(spaced.slice(at + 1)) ? one : '');

        return seen.replace(/ {2,}/gu, ' ').trim();
    }

    slug(name: string): string {
        const said = signs.reduce((held, [sign, word]) => held.replace(sign, word),
            this.normalized(name).toLowerCase().replace(/[\p{Cf}\p{Variation_Selector}]/gu, '').replace(apostrophes, ''));

        return (said.match(words) ?? []).join('-');
    }
}

export const identifier = new Identifier();
