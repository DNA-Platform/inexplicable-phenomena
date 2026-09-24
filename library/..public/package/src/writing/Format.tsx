import { ElementType, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing, $Annotation } from './Writing';

export class $Format extends $Annotation {
    theme = false;
    style?: ElementType;

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
            if (format !== this) writing.annotations.express(format, false);
        if (this.style === undefined)
            writing.containers.remove(this);
        else
            writing.containers.prepend(this, this.style);
    }

    override erase(writing: $Writing): void {
        writing.containers.remove(this);
    }
}

export const Format = $($Format);
