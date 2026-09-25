import { ElementType, ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Reference } from '@/writing/Reference';
import { $Chapter } from './Chapter';

export class $TableOfContents extends $Format {
    specification = new TableOfContentsSpecification();
    style: ElementType = 'nav';

    get contents(): $Content[] {
        const contents: $Content[] = [];
        const visit = (writing: $Writing): void => {
            contents.push(...writing.annotations.find($Content));
            for (const chemical of writing.text)
                if (chemical instanceof $Writing)
                    visit(chemical);
        };
        if (this.parent instanceof $Writing)
            visit(this.parent);
        return contents;
    }
}

export class $Content extends $Reference {
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }
    override get identifier(): string { return binder.reference(html.copy(this.text))?.identifier ?? ''; }

    override note(): ReactNode { return <span className="pa-content">{this.name}</span>; }
}

export class TableOfContentsSpecification extends AnnotationSpecification {
    @specify('a table of contents is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a table of contents is said of a chapter, and this is not one');
    }
}

export const TableOfContents = $($TableOfContents);
export const Content = $($Content);
