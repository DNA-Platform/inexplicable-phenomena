import { $, cache } from '@dna-platform/chemistry';
import { Book, TableOfContents, $Title, $Author, $Subject } from '@dna-platform/public';
import { Wikimedia } from './.cover';
import { WikimediaSynopsis } from './.synopsis';

class $TitleOfWikimedia extends $Title {
    constructor() {
        super();
        this[cache]("Wikimedia");
    }
}

export const TitleOfWikimedia = $($TitleOfWikimedia);

class $AuthorOfWikipedia extends $Author {
    constructor() {
        super();
        this[cache]("Wikipedia");
    }
}

export const AuthorOfWikipedia = $($AuthorOfWikipedia);

class $SubjectOfWikimedia extends $Subject {
    constructor() {
        super();
        this[cache]("Wikimedia");
    }
}

export const SubjectOfWikimedia = $($SubjectOfWikimedia);

export const book = $(
    <Book />,
    Wikimedia,
    $(<TableOfContents />),
    WikimediaSynopsis,
);
