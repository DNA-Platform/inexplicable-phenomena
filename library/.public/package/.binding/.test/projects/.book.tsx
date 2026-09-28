import { Paginated } from '@dna-platform/public';
import { $TheLibrary, Framed } from '../manual/.book';

export default class $SomeProjects extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Paginated />,
            <Framed />
        );
    }
}
