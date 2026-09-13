// THE APPLICATION'S BOOK: what every book in .wiki is written with — a book to extend and four kinds
// of link. It registers no theme, so a chapter may import from it without a book's theme arriving
// with it; each book registers its own theme on Book in its own file.
import { $ } from '@dna-platform/chemistry';
import { $Ref } from '@dna-platform/public';
import { $Encyclopedia } from '@dna-platform/public/encyclopedia';

export default class $Wiki extends $Encyclopedia { }

export class $BookLink extends $Ref { }
export class $SubjectLink extends $Ref { }
export class $AuthorLink extends $Ref { }
export class $OutwardLink extends $Ref { }

export const Wiki = $($Wiki);
export const BookLink = $($BookLink);
export const SubjectLink = $($SubjectLink);
export const AuthorLink = $($AuthorLink);
export const OutwardLink = $($OutwardLink);
