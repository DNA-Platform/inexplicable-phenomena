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
