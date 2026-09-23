import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { AnnotationSpecification } from './Writing';
import { $Format } from './Format';

export class $Theme extends $Format {
    values: object = {};
    specification = new ThemeSpecification();

    override review(writing: ReactNode): ReactNode {
        return <ThemeProvider theme={this.values}>{writing}</ThemeProvider>;
    }
}

export class ThemeSpecification extends AnnotationSpecification {
    @specify('a theme holds only formats')
    $holdsOnlyFormats(theme: $Theme): void {
        $check(theme.contents.length === 0 && theme.annotations
            .every(annotation => annotation instanceof $Format),
            'a theme holds only formats, and this one holds something else');
    }
}

export const Theme = $($Theme);
