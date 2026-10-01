import { $, $check, selection } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Chapter } from './Chapter';
import { $Book } from './Book';

export class $Paginated extends $Format {
    specification = new PaginatedSpecification();
    style = selection.div`
        .pa-page:not(.pa-open) { display: none; }
    `;
    get pages(): $Chapter[] { return this.book?.text.find($Chapter) ?? []; }
    get open(): $Chapter | undefined { return this.book?.bookmark ?? this.book?.cover; }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-paginated');
        const open = this.open;
        const opened = this.pages.find(page => [...page.classes].includes('pa-open'));
        if (opened === open) return;
        opened?.classes.revert(writing);
        open?.classes.add(writing, 'pa-open');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
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
