import { $ } from '@dna-platform/chemistry';
import { Paginated, Theme } from '@dna-platform/public';
import { $TheLibrary } from '../manual/.book';

export default class $SomeProjects extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Paginated />
        );
    }
}

const SomeProjects = $($SomeProjects);
$(SomeProjects, Theme)(Theme);
