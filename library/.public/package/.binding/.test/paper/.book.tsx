import { $TheLibrary, Typewritten } from '../manual/.book';

// THE PAPER'S OWN BOOK, TYPEWRITTEN, as a manuscript is — the face is the manual's, documented in The Faces.
export default class $APaper extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Typewritten />
        );
    }
}
