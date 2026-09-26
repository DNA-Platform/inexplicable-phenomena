import type { Diagnostic } from '../inventory/library';
import { last, separator, spelt } from './language';
import { identifier } from '@dna-platform/public';
import type { Naming, SpotId, Structure } from './structure';

// WHAT MAKES A LIBRARY WELL-FORMED, CHECKED OVER THE COMPILED STRUCTURE. It returns faults and
// raises nothing; the phase that asked decides how a fault is reported.
//
// `catalogue/wellformed.ts` is a PROXY NAME, flagged for Doug.
//
// THE ESSENCE: one book is by its own subject — the autobiography, and there can be only one of
// those — and a book may author when that autobiography is its subject. The catalogue is a tree;
// the topics are a free overlay. EVERY FAULT IS NAMED IN THE LIBRARY'S OWN WORDS, because the
// person holding it is holding a book, not a graph.

// THE FAULTS A LIBRARY CAN HAVE — a closed list, and worth reading as one. Each names something a
// person could say about their own library without knowing this code exists.
export const faults = {
    malformed: 'MALFORMED-ANNOTATION',
    noTitle: 'NO-TITLE',
    duplicateTitle: 'DUPLICATE-TITLE',
    titledTwice: 'TITLED-TWICE',
    unknownReference: 'UNKNOWN-REFERENCE',
    notListed: 'NOT-LISTED',
    notASubject: 'NOT-A-SUBJECT',
    noLibrary: 'NO-LIBRARY',
    twoLibraries: 'TWO-LIBRARIES',
    circularCatalogue: 'CIRCULAR-CATALOGUE',
    topicIsCatalogue: 'TOPIC-IS-CATALOGUE',
    noSynopsis: 'NO-SYNOPSIS',
    notInTheTable: 'NOT-IN-THE-TABLE',
    noAuthor: 'NO-AUTHOR',
    noSelfAuthor: 'NO-SELF-AUTHOR',
    twoSelfAuthors: 'TWO-SELF-AUTHORS',
    mayNotAuthor: 'MAY-NOT-AUTHOR',
    unreferencedMention: 'UNREFERENCED-MENTION',
    sameAddress: 'SAME-ADDRESS',
    noAddress: 'NO-ADDRESS',
    reservedAddress: 'RESERVED-ADDRESS',
    resourceNames: 'RESOURCE-NAMES',
} as const;

// WHERE THE BINDER WRITES SOMETHING OF ITS OWN, so no book may stand there: the bundle's folder,
// which is vite's `assetsDir`. A book called "Assets" would be written into it.
const reserved = new Set(['assets']);

const wrote = (structure: Structure, id: SpotId): { at: string; file: string } => {
    const spot = structure.spots.get(id);

    return { at: spot?.at ?? id, file: spot?.file ?? id };
};

// WHAT A BOOK IS CALLED, for saying so in a sentence. It is never used to compare one thing with
// another — every comparison below is between ids — so a book whose title carries an odd apostrophe
// is printed oddly and nothing else goes wrong.
//
// IT IS A LOOKUP AND NOT A SEARCH. An earlier writing scanned every name in the library to answer
// it, and it is asked inside loops over books — which is fine at six books and is the whole runtime
// at a thousand. Measured 2026-09-18: this file went from 10ms at 100 books to 342ms at 1000, a
// thirty-four-fold cost for ten times the library, while the structure beside it stayed linear.
const called = (structure: Structure, id: SpotId): string => structure.named.get(id) ?? id;

// HOW THE OTHER END WOULD HAVE ANSWERED, written out for an author to copy — and spelled by
// [the language](./language.ts) rather than by this file knowing where the stars go. A message that
// says a connection is missing and does not say what to write sends somebody to read the compiler.
// Only a catalogue and a topic are answered; an author is answered by nothing.
const owes = (relation: 'subject' | 'topic', name: string, facing: 'up' | 'down'): string =>
    spelt(relation, facing === 'up' ? 'target' : 'source', name);

const speaks = (relation: 'subject' | 'topic'): string =>
    relation === 'subject' ? 'catalogue' : 'topical catalogue';

// AND HOW A TABLE REFERS TO A BOOK'S SYNOPSIS, spelled with the name that synopsis titles itself.
const synopsis = (structure: Structure, book: SpotId): string =>
    `$[ ${called(structure, book)}${separator}${structure.named.get(`${book}/.synopsis.tsx`) ?? 'Synopsis'} ]`;

export const wellformed = (structure: Structure): Diagnostic[] => {
    const wrong: Diagnostic[] = [];
    const books = [...structure.spots.values()].filter(spot => spot.kind === 'book');

    // A LIBRARY WITH NO BOOKS IN IT IS A FAULT AND NOT A PASS. Every check below is written over
    // books, so an empty structure satisfies all of them vacuously — which is how this file came to
    // report WELL-FORMED on a library it had failed to read at all. Caught by the fixture the hour
    // the reader changed: four cases that must fail went silently green, and the only reason anyone
    // noticed is that they had been made to fail first.
    if (books.length === 0)
        wrong.push({ fault: faults.noLibrary, at: '', file: '', says: 'nothing here names a book — a library is books, and a specification over none of them passes by saying nothing' });

    // ---- what was written and could not be read ----
    //
    // REFUSED BY NAME RATHER THAN IGNORED. A bracket run that does not balance, or a star count with
    // no form behind it, is a writer reaching for something the notation does not have — and the one
    // outcome that must not happen is silence, because an annotation that does nothing looks exactly
    // like one that works.
    for (const one of structure.refused)
        wrong.push({ fault: faults.malformed, at: wrote(structure, one.by).at, file: one.at.file, says: `line ${one.at.line}: "${one.said}" is not written in a form the notation has — brackets balance, the stars stand on one side only, three brackets carry none, and an author is answered by nothing, so [[ X ]]* is not a form` });

    // ---- one title, one book ----
    for (const [said, held] of structure.names) {
        if (held.length < 2) continue;
        for (const naming of held)
            wrong.push({ fault: faults.duplicateTitle, at: wrote(structure, naming.spot).at, file: naming.at.file, says: `"${said}" is the title here at line ${naming.at.line}, and also in ${held.filter(other => other !== naming).map(other => `${other.at.file} line ${other.at.line}`).join(', ')} — one title, one book` });
    }

    // ---- one address, one thing ----
    //
    // A NAME IS WHAT A PERSON WRITES AND AN ADDRESS IS WHAT A PAGE ANSWERS TO, and the slug between
    // them is not one-to-one: "Doug's Library" and "Dougs Library" are two names at one address, as
    // are "The Sheet" and "the sheet", and "???" is no address at all. A book stands at `/slug/`
    // across the library; a chapter or a mention at `#slug` on its book's page, where the cover
    // already answers to the book's own slug. Doug, 2026-09-20: "Use principles of urls. Do you ever
    // get the same? Then validate that that scenario is impossible."
    const addressed = new Map<string, { said: string; naming: Naming }[]>();
    const claims = (key: string, said: string, naming: Naming): void => { addressed.set(key, [...(addressed.get(key) ?? []), { said, naming }]); };
    for (const [said, held] of structure.names)
        for (const naming of held) {
            const spot = structure.spots.get(naming.spot);
            if (spot === undefined) continue;
            const slugged = identifier.slug(last(said));
            if (slugged === '') { wrong.push({ fault: faults.noAddress, at: spot.at, file: naming.at.file, says: `"${said}" at line ${naming.at.line} leaves nothing to stand at once it is an address — a name carries a letter or a digit` }); continue; }
            if (spot.kind === 'book') {
                if (reserved.has(slugged)) wrong.push({ fault: faults.reservedAddress, at: spot.at, file: naming.at.file, says: `"${said}" would stand at /${slugged}/, where the binder writes its own files — a book stands nowhere the binder does` });
                claims(`/${slugged}/`, said, naming);
            }
            claims(`/${spot.book}/#${slugged}`, said, naming);
        }
    for (const [key, held] of addressed) {
        if (held.length < 2 || new Set(held.map(one => one.said)).size < 2) continue;
        for (const one of held)
            wrong.push({ fault: faults.sameAddress, at: wrote(structure, one.naming.spot).at, file: one.naming.at.file, says: `"${one.said}" at line ${one.naming.at.line} and ${held.filter(other => other !== one).map(other => `"${other.said}" in ${other.naming.at.file} line ${other.naming.at.line}`).join(', ')} would stand at one address — a name is a thing of its own only where its address is` });
    }

    // AND A RESOURCE NAMES NOTHING. It is drawn on every page that wears it, and a name stands in one
    // place — a title makes a chapter and a mention makes an address, and neither can be everywhere.
    for (const one of structure.resourceNames)
        wrong.push({ fault: faults.resourceNames, at: one.by, file: one.at.file, says: `line ${one.at.line} of a resource names "${one.said}" — a resource is drawn wherever it is used, and a name stands in one place` });

    for (const book of books)
        if (!structure.named.has(book.id))
            wrong.push({ fault: faults.noTitle, at: book.at, file: book.file, says: `${book.at} has no title — a book says what it is called with <Title> on its cover` });

    // AND EVERY CHAPTER IS TITLED, because a chapter with no title cannot be listed, cannot be
    // referred to, and cannot be arrived at. The cover is the one file that titles something other
    // than itself: its title is the BOOK's, and the cover is that book's first chapter.
    for (const one of structure.untitled)
        wrong.push({ fault: faults.noTitle, at: one.at, file: one.file, says: `${one.file.split(/[\/]/).pop()} has no title — every chapter says what it is called with a title form, [[ Its Name ]]` });

    // AND A FILE TITLES ONE THING. A title form names the writing its file is; a cover's second one
    // is its About and names that same book, so one naming anything else is a second title.
    for (const one of structure.titledTwice)
        wrong.push({ fault: faults.titledTwice, at: wrote(structure, one.by).at, file: one.at.file, says: `line ${one.at.line} titles "${one.said}", and this file already titles "${called(structure, one.by)}" — a file titles one thing, and a cover's About names its own book` });

    if (wrong.length > 0) return wrong;

    // ---- every reference resolves ----
    //
    // A REFERENCE SPENDS A NAME; AN ANNOTATION MAKES ONE, and making cannot fail for not having been
    // made. So this is the one side of the language that can be wrong by ABSENCE: a `$[ X ]`, and an
    // edge whose other end the library does not hold. A table listing what is not there is this.
    for (const one of structure.mentions) {
        if (structure.reaches(one.name, one.book) !== undefined) continue;
        wrong.push({ fault: faults.unknownReference, at: wrote(structure, one.by).at, file: one.at.file, says: `line ${one.at.line} refers to "${structure.spells(one.name, one.book)}", and nothing in this library is called that` });
    }

    // ---- a name somebody made is a name somebody spends ----
    //
    // Doug, 2026-09-20: "it should also refuse when nothing references a mention in the whole
    // library. It is unnecessary in that case and we want a compact library." A chapter is spent by
    // its table and a book by its catalogue; a mention `[[[ X ]]]` is spent only by a reference.
    for (const spot of structure.spots.values()) {
        if (spot.kind !== 'anchor' || structure.referred.has(spot.id)) continue;
        const naming = structure.names.get(`${called(structure, spot.book)}${separator}${called(structure, spot.id)}`)?.find(one => one.spot === spot.id);
        wrong.push({ fault: faults.unreferencedMention, at: spot.at, file: spot.file, says: `"${called(structure, spot.id)}" is named${naming === undefined ? '' : ` at line ${naming.at.line}`} and nothing in the library refers to it — a name nobody spends is unnecessary, and a library is compact` });
    }

    // ---- a catalogue answers for what stands under it ----
    //
    // THE TWO-WAY RULE. A book saying "I am catalogued by X" is half of a connection and X saying
    // "I catalogue that book" is the other half; either alone is a claim nothing corroborates.
    // Measured before this held: two books in Doug's library reachable from no page a reader could
    // see, with every check green.
    //
    // A BOOK THAT IS ITS OWN CATALOGUE IS ONE EXCEPTION, because both ends of that connection are the
    // same book — which is exactly what makes it the ground rather than a claim. AND AN AUTHOR IS THE
    // OTHER: the language has no answer for one since 2026-09-25, so a By is the whole of its edge and
    // who may author is the colouring's to say.
    for (const edge of structure.edges.values()) {
        if (edge.relation === 'author' || edge.from === edge.to || edge.ends.length > 1) continue;
        const half = edge.ends[0];
        const other = half.end === 'source' ? edge.to : edge.from;
        const mine = half.end === 'source' ? edge.from : edge.to;
        const owed = owes(edge.relation, called(structure, mine), half.end === 'source' ? 'up' : 'down');
        wrong.push({
            fault: faults.notListed,
            at: wrote(structure, other).at,
            file: wrote(structure, other).file,
            says: `"${called(structure, edge.to)}" says its ${speaks(edge.relation)} is "${called(structure, edge.from)}", written in ${half.at.file} line ${half.at.line}, and "${called(structure, other)}" does not answer for it — it owes ${owed}`,
        });
    }

    // AND A BOOK IS FILED ONLY UNDER ONE THAT IS ABOUT SOMETHING. Doug, 2026-09-25: "Any book can be
    // About something, but that allows other books to then be able to use it as a subject catalogue."
    // A cover says what its book is about with a second title form, naming the book; the library's
    // own, which catalogues itself, owes it as well.
    for (const edge of structure.edges.values()) {
        if (edge.relation !== 'subject' || structure.about.has(edge.from)) continue;
        const half = edge.ends.find(h => h.end === 'target') ?? edge.ends[0];
        wrong.push({ fault: faults.notASubject, at: wrote(structure, edge.to).at, file: half.at.file, says: `line ${half.at.line} files "${called(structure, edge.to)}" under "${called(structure, edge.from)}", which is about nothing — a book is a subject when its cover says what it is about, [[ ${called(structure, edge.from)} ]] after its title` });
    }

    // ---- the table of contents, which is where a book answers for what it holds ----
    //
    // Doug, 2026-09-18: "have you validated one edge of the cataloguing graph because it is present
    // in the table of contents of the catalogues — we need that part too." It was not: every
    // catalogue edge was corroborated by an annotation somewhere in the book's apparatus, and the
    // same line written on the cover would have passed identically. The table was doing nothing.

    // A TABLE NEED NOT REFER TO EVERY CHAPTER ITS BOOK HOLDS — a rule that stood until 2026-09-26 as
    // CHAPTER-NOT-LISTED. Every chapter's title already gives it an address, and a table may be
    // drawn from what the chapters mention rather than written; a written one lists what its author
    // chooses. Doug: "Even if we remove the check - because a check on the chapter titles guarantees
    // the table of contents attribute has what it needs, let's test that the references work."

    // AND THE ANSWERING HALF OF A CATALOGUE EDGE IS WRITTEN IN THE TABLE. A catalogue saying
    // elsewhere that it holds a book is a claim in the wrong place: the table of contents is what a
    // reader reads, so it is where the claim has to stand to be worth anything.
    for (const edge of structure.edges.values()) {
        if (edge.relation !== 'subject' || edge.from === edge.to) continue;
        // AND A TABLE THAT CATALOGUES A BOOK REFERS TO THAT BOOK'S OWN SYNOPSIS — Doug, 2026-09-19:
        // "the table needs links to its chapters and the books that those chapters are synopses
        // of"; 2026-09-20: "In the book. It has a .synopsis file literally." A catalogue's table is
        // where each synopsis is reached from.
        const listing = structure.lists.get(edge.from)?.get(edge.to);
        if (listing !== undefined && !listing.synopsis)
            wrong.push({ fault: faults.noSynopsis, at: wrote(structure, edge.from).at, file: listing.at.file, says: `line ${listing.at.line} answers for "${called(structure, edge.to)}" and the table does not refer to its synopsis — a catalogue's table reaches each book's own synopsis, ${synopsis(structure, edge.to)}` });
        const answering = edge.ends.find(one => one.end === 'source');
        if (answering === undefined || answering.at.file.endsWith('.table.tsx')) continue;
        wrong.push({ fault: faults.notInTheTable, at: wrote(structure, edge.from).at, file: answering.at.file, says: `"${called(structure, edge.from)}" says it catalogues "${called(structure, edge.to)}" at line ${answering.at.line}, which is not its table of contents — a catalogue answers for what it holds where a reader can see it` });
    }

    // ---- the catalogue is a tree ----
    for (const book of books) {
        // THE LIBRARY CATALOGUES ITSELF, AND THAT IS THE ROOT RATHER THAN A RING. It is caught here
        // as well as in the loop below, because the walk starts with the book already seen — so the
        // root's own self-edge reads as a cycle on the very first step.
        const above = structure.subjectOf.get(book.id);
        if (above === undefined || above === book.id) continue;
        const seen = new Set<SpotId>([book.id]);
        let here = above;
        for (;;) {
            if (seen.has(here)) { wrong.push({ fault: faults.circularCatalogue, at: book.at, file: book.file, says: `walking up from "${called(structure, book.id)}" through its catalogues comes back to "${called(structure, here)}" without reaching the library — the canonical catalogue is a tree` }); break; }
            seen.add(here);
            const next = structure.subjectOf.get(here);
            // THE LIBRARY IS ITS OWN CATALOGUE, AND THAT IS WHERE THE WALK STOPS. A self-edge at the
            // root is the terminating case rather than a ring — found by running this against Doug's
            // own library, where every book reported a circular catalogue because the walk reached
            // the library, saw it point at itself, and called that a cycle.
            if (next === undefined || next === here) break;
            here = next;
        }
    }

    const roots = books.filter(book => structure.subjectOf.get(book.id) === undefined || structure.subjectOf.get(book.id) === book.id);
    if (roots.length === 0 && books.length > 0)
        wrong.push({ fault: faults.noLibrary, at: books[0].at, file: books[0].file, says: 'every book here is catalogued by another and none of them is the library — a catalogue is a tree and a tree has a root' });
    if (roots.length > 1)
        for (const root of roots)
            wrong.push({ fault: faults.twoLibraries, at: root.at, file: root.file, says: `"${called(structure, root.id)}" is catalogued by nothing, and so ${roots.length > 2 ? 'are' : 'is'} ${roots.filter(other => other !== root).map(other => `"${called(structure, other.id)}"`).join(', ')} — one of these is the library and the rest belong under it` });

    // ---- a topic is one of the OTHER catalogues a book stands in ----
    for (const [id, topics] of structure.topicsOf)
        for (const topic of topics) {
            const spot = wrote(structure, id);
            if (structure.subjectOf.get(id) === topic) {
                wrong.push({ fault: faults.topicIsCatalogue, at: spot.at, file: spot.file, says: `"${called(structure, id)}" names "${called(structure, topic)}" as a topic and as its canonical catalogue — a topic is one of the OTHER catalogues it stands in` });
                continue;
            }
            const listing = structure.lists.get(topic)?.get(id);
            if (listing !== undefined && !listing.synopsis)
                wrong.push({ fault: faults.noSynopsis, at: wrote(structure, topic).at, file: listing.at.file, says: `"${called(structure, topic)}" answers for "${called(structure, id)}" and its table does not refer to its synopsis — a book standing in a catalogue that is not its own says there what it is, ${synopsis(structure, id)}` });
        }

    // ---- authorship: the autobiography, and the books it catalogues ----
    const itself = [...structure.authorOf].filter(([of, by]) => of === by).map(([of]) => of);
    if (itself.length === 0 && books.length > 0)
        wrong.push({ fault: faults.noSelfAuthor, at: books[0].at, file: books[0].file, says: 'no book here is by its own subject — a library is grounded by one autobiography, and without it every attribution rests on nothing' });
    if (itself.length > 1)
        for (const one of itself)
            wrong.push({ fault: faults.twoSelfAuthors, at: wrote(structure, one).at, file: wrote(structure, one).file, says: `"${called(structure, one)}" is by its own subject, and so ${itself.length > 2 ? 'are' : 'is'} ${itself.filter(other => other !== one).map(other => `"${called(structure, other)}"`).join(', ')} — there can be only one of those` });

    if (structure.origin !== undefined)
        for (const book of books) {
            const author = structure.authorOf.get(book.id);
            if (author === undefined) { wrong.push({ fault: faults.noAuthor, at: book.at, file: book.file, says: `"${called(structure, book.id)}" says nowhere who wrote it — every book names its author` }); continue; }
            if (structure.authors.has(author)) continue;

            // WHY IT MAY NOT AUTHOR, said as the rule rather than as a set membership. Doug, 2026-09-25:
            // "1. A book that is by its subject — There can be only one of those. 2. Any book
            // catalogued by one that is a subject." So an author that is not the one book by its
            // subject failed at its subject, which is nothing or not that book.
            const above = structure.subjectOf.get(author);
            const because = above === undefined
                ? `"${called(structure, author)}" is catalogued by nothing`
                : `"${called(structure, author)}" is catalogued by "${called(structure, above)}", which is not the one book by its own subject`;
            wrong.push({ fault: faults.mayNotAuthor, at: book.at, file: book.file, says: `"${called(structure, book.id)}" is authored by "${called(structure, author)}", which may not author: ${because}` });
        }

    return wrong;
};
