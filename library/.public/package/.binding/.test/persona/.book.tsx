import { $Chapter } from '@dna-platform/public';
import { $TheLibrary, Framed, Literary } from '../manual/.book';

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
