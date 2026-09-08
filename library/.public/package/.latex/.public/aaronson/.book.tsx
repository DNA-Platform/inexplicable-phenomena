// CREATED 2026-09-08 · rating 4 · shell. The .latex demo's book: the Aaronson article Doug supplies, its theme installed HERE by registration. Owed: the paper's chapters, an $Article part with a $Margin.
import { $ } from '@dna-platform/chemistry';
import { $Book, Theme } from '@dna-platform/public';
import { Theme as Latex } from '@dna-platform/public/article';

export default class $Aaronson extends $Book { }

export const Aaronson = $($Aaronson);

$(Aaronson, Theme)(Latex);
