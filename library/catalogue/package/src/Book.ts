import { $Chemical } from "@dna-platform/chemistry";

// The organization of language as one evolutionary tree.
// Everything begins as a Word and grows by three operators:
//
//   aggregate    one -> many        recurs into a sequence of itself   (a field: X[])
//   refine       one -> same        must now check or resolve          (extends + a contract)
//   specialize   one -> specified   takes on a role                    (extends)
//
// A role never attaches to a bare Word: aggregate first, then specialize.
// A Title is a specialized *expression* — many words — never a specialized Word.

// the atom
class $Word extends $Chemical { }

// aggregate(Word): a collection of words — a phrase. The first thing a role can attach to.
class $Expression extends $Chemical {
    words: $Word[] = [];
}

// refine(Expression): an expression held to being a complete statement.
class $Sentence extends $Expression { }

// aggregate(Sentence)
class $Paragraph extends $Chemical {
    sentences: $Sentence[] = [];
}

// aggregate(Paragraph) gathered under a heading.
class $Section extends $Chemical {
    heading?: $Heading;
    paragraphs: $Paragraph[] = [];
}

// aggregate(Section)
class $Chapter extends $Chemical {
    sections: $Section[] = [];
}

// specialize(Expression): a phrase in the naming role.
class $Title extends $Expression { }

// specialize(Title): a title at section scale — and a target a reference can resolve to.
class $Heading extends $Title { }

// specialize(Paragraph): the one paragraph that summarizes the rest.
class $Synopsis extends $Paragraph { }

// specialize(Expression): a phrase that carries a definition.
class $Term extends $Expression { }

// refine(Expression): a phrase that must be well-formed.
class $Name extends $Expression { }

// refine(Name): a name that must resolve to something else on the tree.
class $Reference extends $Name { }

// specialize(Reference): a reference in the attribution role.
class $Author extends $Reference { }

// specialize(Reference): a reference in formal-source form.
class $Citation extends $Reference { }

// aggregate(Reference): references down to a thing's own parts. Derived, not authored.
class $TableOfContents extends $Chemical {
    entries: $Reference[] = [];
}

// aggregate(Citation): references out.
class $Citations extends $Chemical {
    references: $Citation[] = [];
}

// specialize(Chapter): the top chapter — the self-describing head a container grows.
class $Cover extends $Chapter {
    title?: $Title;
    author?: $Author;
    synopsis?: $Synopsis;
    contents?: $TableOfContents;
}

// aggregate(Chapter) behind a cover.
class $Book extends $Chemical {
    cover?: $Cover;
    chapters: $Chapter[] = [];
}

// specialize(Book): a book whose chapters are themselves books — a catalogue.
class $Subject extends $Book {
    books: $Book[] = [];
}

// specialize(Subject): a subject whose books are themselves subjects.
class $Library extends $Subject {
    subjects: $Subject[] = [];
}
