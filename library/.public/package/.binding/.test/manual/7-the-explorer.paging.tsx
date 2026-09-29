import { $ } from '@dna-platform/chemistry';
import { $Chapter, $Paginated, $Section, $Writing } from '@dna-platform/public';
import { $Appendix } from './7-the-explorer.appendix.tsx';

export class $Tabbed extends $Paginated {
    override get pages(): $Chapter[] { return super.pages.filter(page => page !== this.book?.table && page !== this.book?.synopsis); }
    override get open(): $Chapter | undefined {
        const book = this.book;
        if (book === undefined || book.bookmark !== undefined) return super.open;
        const place = book.$bookmark;
        return this.pages.find(page => page.text.find($Section).some(section => section.mention?.identifier === place)) ?? super.open;
    }
    get appendix(): $Section | undefined {
        const appendices = this.open === undefined ? [] : $Appendix.of(this.open);
        return appendices.find(appendix => appendix.mention?.identifier === this.book?.$bookmark) ?? appendices[0];
    }

    override defines(writing: $Writing): void {
        super.defines(writing);
        const synopsis = this.book?.synopsis;
        if (synopsis !== undefined) this.show(synopsis, this.open === this.book?.cover);
        const shown = this.appendix;
        for (const page of this.pages)
            for (const appendix of $Appendix.of(page))
                this.show(appendix, appendix === shown);
    }

    protected show(writing: $Writing, shown: boolean): void {
        const open = [...writing.classes].includes('pa-open');
        if (shown && !open) writing.classes.add(this, 'pa-open');
        if (!shown && open) writing.classes.revert(this);
    }
}

export const Tabbed = $($Tabbed);
