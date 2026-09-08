// CREATED 2026-09-08 — Sprint 53 scaffold, CLAY. The book of the .latex demo: Scott Aaronson's article on the times undecidability cropped up around P vs NP (Doug supplies the source; best identification "Is P Versus NP Formally Independent?", 2003). Replicated so it FEELS NATIVE — the gate is a person reading it beside the PDF.
// The theme is INSTALLED here, by registration on this book's component (Doug: "registration is done by the user or by another module… either global or by book") — never carried by the theme.
// OWED: the article as an $Article part with a $Margin (Sprint 51's model), the paper's chapters as N-name.tsx files, the cover with title/authors/abstract.
import { $ } from '@dna-platform/chemistry';
import { $Book, Theme } from '@dna-platform/public';
import { LatexTheme } from '@dna-platform/public/article';

export default class $Aaronson extends $Book { }

export const Aaronson = $($Aaronson);

$(Aaronson, Theme)(LatexTheme);
