import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { $Path, Path } from '../reference/Path';
import { $Section } from '../writing/Section';
import { $Chapter } from './Chapter';

export class $Row extends $Section implements $Reference$<$Chapter> {
    $path!: $Reference$<$Chapter>;

    get copy(): string { return this.valid() ? this.read().canonical.heading : ''; }

    get heading(): string { return this.copy; }

    get chapter(): $Chapter { return this.read(); }

    read(): $Chapter {
        return this.$path.read();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Chapter, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    valid(): boolean {
        try {
            return this.$path !== undefined && this.$path.read() instanceof $Chapter;
        } catch {
            return false;
        }
    }
}

export const Row = $($Row) as any as (props: { path: $Reference$<$Chapter> }) => any;
