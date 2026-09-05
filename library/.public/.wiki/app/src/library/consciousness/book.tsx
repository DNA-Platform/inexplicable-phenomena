import { $, cache } from '@dna-platform/chemistry';
import { Book, TableOfContents, $Title, $Author, $Subject } from '@dna-platform/public';
import { Consciousness } from './.cover';
import { ConsciousnessSynopsis } from './.synopsis';
import { TheHardProblem } from './01-the-hard-problem';
import { Correlates } from './02-correlates';
import { Theories } from './03-theories';

class $TitleOfConsciousness extends $Title {
    constructor() {
        super();
        this[cache]("Consciousness");
    }
}

export const TitleOfConsciousness = $($TitleOfConsciousness);

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
    Consciousness,
    $(<TableOfContents />),
    ConsciousnessSynopsis,
    TheHardProblem,
    Correlates,
    Theories,
);
