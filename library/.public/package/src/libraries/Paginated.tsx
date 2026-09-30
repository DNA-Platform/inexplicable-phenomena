import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from '@/writing/Writing';
import { $Chapter } from './Chapter';
import { $Book } from './Book';

export class $Paginated extends $Annotation {
    specification = new PaginatedSpecification();
    get pages(): $Chapter[] { return this.book?.text.find($Chapter) ?? []; }
    get open(): $Chapter | undefined { return this.book?.bookmark ?? this.book?.cover; }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-paginated');
        const open = this.open;
        const opened = this.pages.find(page => [...page.classes].includes('pa-open'));
        if (opened === open) return;
        opened?.classes.revert(writing);
        open?.classes.add(writing, 'pa-open');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }

    protected override $Bound(): void {
        for (const page of this.pages)
            page.classes.add(this, 'pa-page');
        super.$Bound();
    }
}

export class PaginatedSpecification extends AnnotationSpecification {
    @specify('paginated is said of a book')
    $saidOfABook(writing: $Writing): void {
        $check(writing instanceof $Book, 'paginated is said of a book, and this is not one');
    }
}

export const Paginated = $($Paginated);
