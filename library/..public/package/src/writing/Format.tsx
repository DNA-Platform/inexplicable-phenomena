import { ElementType, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing, $Annotation } from './Writing';

export class $Format extends $Annotation {
    theme = false;
    style?: ElementType;
    protected envelope?: ElementType;

    $Format(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        if (!this.theme) return;
        const Style = this.style ?? 'span';
        this.style = (props: { children?: ReactNode }) => (
            <ThemeProvider theme={this}>
                <Style {...props} />
            </ThemeProvider>
        );
    }

    override defines(writing: $Writing): void {
        for (const format of writing.annotations.find($Format))
            if (format !== this) format.express(false);
        this.apply(writing);
    }

    override erase(writing: $Writing): void {
        if (this.envelope === undefined || writing.container !== this.style) return;
        writing.container = this.envelope;
        this.envelope = undefined;
    }

    apply(writing: $Writing): void {
        if (this.style === undefined || writing.container === this.style) return;
        this.envelope ??= writing.container;
        writing.container = this.style;
    }
}

export const Format = $($Format);
