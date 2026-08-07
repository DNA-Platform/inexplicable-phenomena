import { $, $check } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { $Path, Path } from '../reference/Path';
import { $Chapter } from './Chapter';
import { type $Title } from '../writing/Title';
import { type $Book } from './Book';
import { $Section } from '../writing/Section';

export class $Cover extends $Chapter implements $Reference$<$Book> {
    get summary(): $Section { return this.canonical; }

    get title(): $Title { return super.title!; }

    read(): $Book {
        if (!this.book) throw new Error('The cover stands outside any book.');
        return this.book;
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Book, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    $Cover(...sections: $Section[]) {
        super.$Chapter(...sections);
        if (!this.title) throw new Error('A cover requires a title.');
    }
}

export const Cover = $($Cover);
