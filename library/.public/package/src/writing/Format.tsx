import { ElementType, ReactNode } from 'react';
import { $, $Chemical, children, theme } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { $Writing, $Annotation } from './Writing';
import type { $Theme } from './Theme';

export class $Format extends $Annotation {
    themeProvider = false;
    style?: ElementType;
    protected _provider?: ElementType;
    get theme(): $Theme {
        const book = this.book;
        if (book === undefined) throw new Error('a format reads its theme from its book, and this one stands in none');
        return book.theme;
    }

    $Format(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        if (!this.themeProvider) return;
        const Provider = $(provider);
        this._provider = $(reflection.chemical<$Provider>(<Provider format={this} />, this));
    }

    override defines(writing: $Writing): void {
        const layer = this._provider ?? this.style;
        if (layer !== undefined)
            writing.containers.add(this, layer);
    }

    override erase(writing: $Writing): void {
        writing.containers.revert(this);
    }
}

export class $Provider extends $Chemical {
    $format!: $Format;
    $className?: string;
    override get [theme](): $Theme { return this.$format.theme; }

    view(): ReactNode {
        const Style = this.$format.style ?? 'div';
        return <Style className={this.$className}>{this[children]}</Style>;
    }
}

export const Format = $($Format);
const provider = $($Provider);
