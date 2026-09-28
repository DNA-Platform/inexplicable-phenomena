import { $Chapter } from '@dna-platform/public';
import { $TheLibrary, Framed, Literary } from '../manual/.book';

// EVERY CHAPTER FRAMED, by the book at its bind, once the book is whole: the same Framed that Some Projects
// stands on itself, here said of each chapter — a format working in a different place. And the book LITERARY,
// a face of its own in front of the library's theme. Both are the manual's, documented in The Faces. Doug,
// 2026-09-27: "I like each book having slightly different feels."
export default class $APersona extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Literary />
        );
    }

    protected override $Bound(): void {
        for (const chapter of this.text.find($Chapter))
            chapter.annotations.add(this,
                <Framed />
            );
        super.$Bound();
    }
}
