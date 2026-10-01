import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from './Writing';
import { $Format } from './Format';

export class $Theme extends $Format {
    specification = new ThemeSpecification();
    themeProvider = true;
    get values(): Record<string, string> { return {}; }
    override get theme(): $Theme { return this; }

    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Theme)
                writing.annotations.express(annotation, false);
        super.defines(writing);
    }
}

export class ThemeSpecification extends AnnotationSpecification {
    @specify('a theme is said of a book')
    $saidOfABook(writing: $Writing): void {
        $check(writing.book === writing, 'a theme is said of a book, and this is not one');
    }
}

export const Theme = $($Theme);
