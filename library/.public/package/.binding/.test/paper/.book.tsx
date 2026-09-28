import { $TheLibrary, Typewritten } from '../manual/.book';

export default class $APaper extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Typewritten />
        );
    }
}
