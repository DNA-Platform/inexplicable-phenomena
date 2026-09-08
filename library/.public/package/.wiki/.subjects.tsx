// CREATED 2026-09-08 — Sprint 53 scaffold, CLAY. THE SUBJECT CHAIN ABOVE THE TURING ARTICLE — Doug: "try to implement books on the subject chain of the Turing article — what would be the page representing the subject of turing, and the subject of that? How far up does it go?"
// The article's cover says <Subject>English computer scientist (1912–1954)</Subject>. Under closure under books, a subject IS a book — the one that catalogues the books on that subject (Sprint 9: the subject link as a BACK ARROW; the recursive library property) — and the chain ends at the book that is its own subject, which is how a library self-catalogues.
// These are shells, not bound by build.mjs (they are not directories with a .book.tsx), so the demo keeps building. Each becomes a directory `.wiki/<subject>/` with .book.tsx, .cover.tsx and chapters when built. The chain below is a GUESS at Wikipedia's own category ladder for Turing; the real one is read off the article's categories.
import { $ } from '@dna-platform/chemistry';
import { $Book } from '@dna-platform/public';

export class $EnglishComputerScientists extends $Book { }   // the subject of the Turing article: its catalogue lists Turing and his peers
export class $ComputerScientists extends $Book { }          // the subject of that
export class $ComputerScience extends $Book { }             // the subject of that
export class $Science extends $Book { }                     // the subject of that
export class $Wikipedia extends $Book { }                   // the top: the encyclopedia, whose subject is itself — closure

export const EnglishComputerScientists = $($EnglishComputerScientists);
export const ComputerScientists = $($ComputerScientists);
export const ComputerScience = $($ComputerScience);
export const Science = $($Science);
export const WikipediaSubject = $($Wikipedia);
