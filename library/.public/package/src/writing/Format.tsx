import { ElementType, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing, $Annotation } from './Writing';
import type { $Theme } from './Theme';

export class $Format extends $Annotation {
    themeProvider = false;
    style?: ElementType;
    get theme(): $Theme {
        const book = this.book;
        if (book === undefined) throw new Error('a format reads its theme from its book, and this one stands in none');
        return book.theme;
    }

    $Format(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        if (this.themeProvider) this.style = this.provide(this.style ?? 'span');
    }

    protected provide(Style: ElementType): ElementType {
        return (props: { children?: ReactNode }) => (
            <ThemeProvider theme={this.theme.contract}>
                <Style {...props} />
            </ThemeProvider>
        );
    }

    override defines(writing: $Writing): void {
        if (this.style !== undefined)
            writing.containers.add(this, this.style);
    }

    override erase(writing: $Writing): void {
        writing.containers.revert(this);
    }
}

export const Format = $($Format);
