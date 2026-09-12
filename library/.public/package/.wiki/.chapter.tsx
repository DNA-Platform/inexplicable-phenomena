// What every book in .wiki is written with: four kinds of link. A book's .chapter.tsx carries
// what its chapters share; this is the application's, shared by every book in it.
import { $ } from '@dna-platform/chemistry';
import { $Ref } from '@dna-platform/public';

export class $BookLink extends $Ref { }
export class $SubjectLink extends $Ref { }
export class $AuthorLink extends $Ref { }
export class $OutwardLink extends $Ref { }

export const BookLink = $($BookLink);
export const SubjectLink = $($SubjectLink);
export const AuthorLink = $($AuthorLink);
export const OutwardLink = $($OutwardLink);
