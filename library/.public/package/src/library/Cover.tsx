import { ElementType, ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Reference, Reference as reference } from '@/writing/Reference';
import { $Chapter } from './Chapter';

export class $Cover extends $Format {
    specification = new CoverSpecification();
    style: ElementType = 'header';

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-cover');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

export class $Author extends $Annotation {
    specification = new AuthorSpecification();
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }
    get reference(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Define(): void {
        super.$Define();
        const link = binder.reference(html.copy(this.text));
        if (link === undefined) return;
        const Reference = $(reference);
        this.annotations.add(this,
            <Reference>{link.identifier}</Reference>
        );
    }

    override write(): ReactNode { return this.name; }
}

export class $Subject extends $Annotation {
    specification = new SubjectSpecification();
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }
    get reference(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Define(): void {
        super.$Define();
        const link = binder.reference(html.copy(this.text));
        if (link === undefined) return;
        const Reference = $(reference);
        this.annotations.add(this,
            <Reference>{link.identifier}</Reference>
        );
    }

    override write(): ReactNode { return this.name; }
}

export class $About extends $Annotation {
    specification = new AboutSpecification();
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }
    get reference(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Define(): void {
        super.$Define();
        const link = binder.reference(html.copy(this.text));
        if (link === undefined) return;
        const Reference = $(reference);
        this.annotations.add(this,
            <Reference>{link.identifier}</Reference>
        );
    }

    override write(): ReactNode { return this.name; }
}

export class CoverSpecification extends AnnotationSpecification {
    @specify('a cover is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a cover is said of a chapter, and this is not one');
    }

    @specify('a cover carries its author')
    $carriesItsAuthor(writing: $Writing): void {
        $check(writing.is($Author), 'a cover carries its author, and this one carries none');
    }

    @specify('a cover carries its subject')
    $carriesItsSubject(writing: $Writing): void {
        $check(writing.is($Subject), 'a cover carries its subject, and this one carries none');
    }
}

export class AuthorSpecification extends AnnotationSpecification {
    @specify('an author is said of a cover')
    $saidOfACover(writing: $Writing): void {
        $check(writing instanceof $Chapter && writing.is($Cover), 'an author is said of a cover, and this is not one');
    }
}

export class SubjectSpecification extends AnnotationSpecification {
    @specify('a subject is said of a cover')
    $saidOfACover(writing: $Writing): void {
        $check(writing instanceof $Chapter && writing.is($Cover), 'a subject is said of a cover, and this is not one');
    }
}

export class AboutSpecification extends AnnotationSpecification {
    @specify('about is said of a cover')
    $saidOfACover(writing: $Writing): void {
        $check(writing instanceof $Chapter && writing.is($Cover), 'about is said of a cover, and this is not one');
    }

    @specify('about names its own book')
    $namesItsOwnBook(writing: $Writing): void {
        const about = writing.annotations.expressed($About);
        const title = writing instanceof $Chapter ? writing.canonical : undefined;
        $check(about?.reference?.identifier === title?.means?.identifier,
            'about names its own book, and this one names another');
    }
}

export const Cover = $($Cover);
export const Author = $($Author);
export const Subject = $($Subject);
export const About = $($About);
