import { $, $check } from '@dna-platform/chemistry';
import { $Referent$ } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Chapter } from './Chapter';
import { $Title } from '../writing/Title';
import { $Book } from './Book';
import { $Section } from '../writing/Section';
import { $Author } from './Author';
import { $Subject } from './Subject';

export class $Cover extends $Chapter implements $Reference$<$Book> {
    get summary(): $Section { return this.canonical; }

    get title(): $Title { return super.title!; }

    get author(): $Author | undefined {
        return this.sections.flatMap(s => s.elements).find(e => e instanceof $Author) as $Author | undefined;
    }

    get subject(): $Subject | undefined {
        return this.sections.flatMap(s => s.elements).find(e => e instanceof $Subject) as $Subject | undefined;
    }

    read(): $Book {
        if (!this.book) throw new Error('The cover stands outside any book.');
        return this.book;
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    $Cover(...sections: $Section[]) {
        try {
            super.$Chapter(...sections);
        } catch (error) {
            if (this.title) throw error;
        }
        if (!this.title) throw new Error('A cover requires a title.');
    }
}

export const Cover = $($Cover);
