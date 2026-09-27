import { $Chapter } from '@dna-platform/public';
import $TheLibrary, { Framed } from '../the-library/.book';

// EVERY CHAPTER FRAMED, by the book at its bind, once the book is whole: the same Framed that Some Projects
// stands on itself, here said of each chapter — a format working in a different place, inside the theme's
// provider and reading its values.
export default class $APersona extends $TheLibrary {
    protected override $Bound(): void {
        for (const chapter of this.text.find($Chapter))
            chapter.annotations.add(this,
                <Framed />
            );
        super.$Bound();
    }
}
