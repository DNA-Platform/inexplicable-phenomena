import { Paginated } from '@dna-platform/public';
import { $TheLibrary, Framed } from '../manual/.book';

// THE ONE PAGINATED BOOK OF THE TEST LIBRARY: its chapters are pages and one shows at a time, the chapter
// its bookmark names — so /some-projects/ shows the cover and /some-projects/the-work/ the work, and the
// catchword's links turn the page in place. Stood in the book's own class as the theme is. Doug,
// 2026-09-27: "Paginated is just one annotation that serves as an example... A book can't be limited in
// how its chapters are displayed and .public gives its authors the ability to subclass Book."
export default class $SomeProjects extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Paginated />,
            <Framed />
        );
    }
}
