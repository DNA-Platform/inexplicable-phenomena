import { $, cache } from '@dna-platform/chemistry';
import { Book, TableOfContents, $Title, $Author, $Subject } from '@dna-platform/public';
import { Chemistry } from './.cover';
import { ChemistrySynopsis } from './.synopsis';
import { Bonds } from './01-bonds';
import { Reactions } from './02-reactions';
import { Elements } from './03-elements';

class $TitleOfChemistry extends $Title {
    constructor() {
        super();
        this[cache]("Chemistry");
    }
}

export const TitleOfChemistry = $($TitleOfChemistry);

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
    Chemistry,
    $(<TableOfContents />),
    ChemistrySynopsis,
    Bonds,
    Reactions,
    Elements,
);
