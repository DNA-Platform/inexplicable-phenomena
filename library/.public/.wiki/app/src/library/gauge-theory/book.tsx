import { $, cache } from '@dna-platform/chemistry';
import { Book, TableOfContents, $Title, $Author, $Subject } from '@dna-platform/public';
import { GaugeTheory } from './.cover';
import { GaugeTheorySynopsis } from './.synopsis';
import { History } from './01-history';
import { Symmetry } from './02-symmetry';
import { Forces } from './03-forces';

class $TitleOfGaugeTheory extends $Title {
    constructor() {
        super();
        this[cache]("Gauge Theory");
    }
}

export const TitleOfGaugeTheory = $($TitleOfGaugeTheory);

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
    GaugeTheory,
    $(<TableOfContents />),
    GaugeTheorySynopsis,
    History,
    Symmetry,
    Forces,
);
