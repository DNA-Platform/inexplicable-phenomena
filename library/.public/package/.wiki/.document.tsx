// The .wiki application's own kinds — what every book in it is written with. Four kinds of link
// and nothing else: the chrome that stood here is an ENCYCLOPEDIA's, not this application's, and
// it moved into the package with the rest of what stands above the fold.
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
