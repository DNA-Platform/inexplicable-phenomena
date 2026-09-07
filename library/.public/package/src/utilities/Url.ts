export class UrlParser {
    private base = 'https://library';
    private patterns = {
        broken: /\s/u,
        scheme: /^([a-z][a-z0-9+.-]*):/iu,
        host: /^(?:[a-z][a-z0-9+.-]*:)?\/\//iu,
        address: /^(?:[a-z][a-z0-9+.-]*:\/\/|\/\/|\/|#|\?)/iu
    };

    reads(copy: string): boolean {
        return !this.patterns.broken.test(copy) && URL.canParse(copy, this.base);
    }

    addresses(copy: string): boolean {
        return this.patterns.address.test(copy) && this.reads(copy);
    }

    scheme(copy: string): string {
        return this.reads(copy) ? this.patterns.scheme.exec(copy)?.[1] ?? '' : '';
    }

    host(copy: string): string {
        return this.reads(copy) && this.patterns.host.test(copy) ? this.parsed(copy)?.host ?? '' : '';
    }

    path(copy: string): string {
        if (!this.reads(copy)) return '';
        const written = copy.replace(this.patterns.scheme, '').replace(/^\/\/[^/?#]*/u, '');
        return written.startsWith('?') || written.startsWith('#') ? '' : this.parsed(copy)?.pathname ?? '';
    }

    query(copy: string): string {
        return this.reads(copy) ? this.parsed(copy)?.search.replace(/^\?/u, '') ?? '' : '';
    }

    fragment(copy: string): string {
        return this.reads(copy) ? this.parsed(copy)?.hash.replace(/^#/u, '') ?? '' : '';
    }

    parts(copy: string): { scheme: string; host: string; path: string; query: string; fragment: string } {
        return {
            scheme: this.scheme(copy),
            host: this.host(copy),
            path: this.path(copy),
            query: this.query(copy),
            fragment: this.fragment(copy)
        };
    }

    private parsed(copy: string): URL | undefined {
        return URL.canParse(copy, this.base) ? new URL(copy, this.base) : undefined;
    }
}

export const url = new UrlParser();
