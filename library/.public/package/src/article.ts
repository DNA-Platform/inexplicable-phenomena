// The door @dna-platform/public/article — the LaTeX article as a book type.
//
// ABSTRACT IS BACK, 2026-09-09, and the note below is kept because the reasoning in it is what got
// corrected rather than what was wrong. Doug: "you should have an abstract in article and that
// should be carrying it… Our framework isn't fake. It is polymorphic and you can't wrap your head
// around that. Two things can be nearly identical but different just because you can register
// components to each independently." A kind earns its keep by being a REGISTRATION KEY and a class
// name, not only by adding a member.
//
// THE ORIGINAL NOTE: ABSTRACT WAS HERE AND IS DELETED, not moved back. Read beside library/Synopsis it was the SAME
// CLASS under another name — both extend $Composition, both parenthetical, both a $TypeOfChapter
// with an empty specification, line for line. A paper's abstract IS a synopsis; `abstract` is what
// one domain calls it. Doug's own rule settles which word survives: a kind is named after its
// CANONICAL member, the way $Letter is named for a letter and covers every character. This is the
// public library, so the library's word wins and a paper writes <Synopsis print>.
// That also dissolves Q7 — "an <Abstract> would vanish because it is parenthetical" was a question
// about a duplicate, and `print` is how a parenthetical is shown.
//
// Section was here and is deleted: numbering is not LaTeX's, and reflection.numbered answers it.
// Margin was here and is deleted: it held header, sidebar and footer, and all three are the app's.
// THAT IS REVERSED FOR THE HEADER, 2026-09-09, on Doug's instruction — "the header can be a
// component from the framework in the article abstraction". Every paper wants the strip and no
// paper wants to write it. The sidebar and the footer stay the app's.
export * from './article/Article';
export * from './article/Theorem';
export * from './article/Footnote';
export * from './article/Appendix';
export * from './article/Abstract';
export * from './article/Header';
export * from './article/Theme';
