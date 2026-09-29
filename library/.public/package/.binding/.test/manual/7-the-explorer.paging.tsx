import { $ } from '@dna-platform/chemistry';
import { $Chapter, $Paginated, $Section, $Writing } from '@dna-platform/public';
import { $Appendix } from './7-the-explorer.appendix.tsx';

export class $Tabbed extends $Paginated {
    override get pages(): $Chapter[] { return super.pages.filter(page => page !== this.book?.table); }
    override get open(): $Chapter | undefined {
        const book = this.book;
        if (book === undefined || book.bookmark !== undefined) return super.open;
        const place = book.$bookmark;
        return this.pages.find(page => page.text.find($Section).some(section => section.mention?.identifier === place)) ?? super.open;
    }

    override defines(writing: $Writing): void {
        super.defines(writing);
        const place = this.book?.$bookmark;
        for (const page of this.pages)
            for (const appendix of $Appendix.of(page)) {
                const here = appendix.mention?.identifier === place;
                const open = [...appendix.classes].includes('pa-open');
                if (here && !open) appendix.classes.add(this, 'pa-open');
                if (!here && open) appendix.classes.revert(this);
            }
    }
}

export const Tabbed = $($Tabbed);
