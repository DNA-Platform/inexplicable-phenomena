import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $Ref, Book } from '@dna-platform/public';
import { Appearance } from '@dna-platform/public/application';
import { $EncyclopediaTheme } from '@dna-platform/public/encyclopedia';

// WHAT EVERY BOOK IN .WIKI IS WRITTEN WITH: four kinds of link, carried by the article's book since
// every wiki book is an article or the portal that leads to one.
export class $BookLink extends $Ref { }
export class $SubjectLink extends $Ref { }
export class $AuthorLink extends $Ref { }
export class $OutwardLink extends $Ref { }

export const BookLink = $($BookLink);
export const SubjectLink = $($SubjectLink);
export const AuthorLink = $($AuthorLink);
export const OutwardLink = $($OutwardLink);

export default class $Article extends $Book {
    override header(): ReactNode {
        const Panel = $(Appearance);

        return <Panel />;
    }
}

export const Article = $($Article);

$EncyclopediaTheme.$register(Book);
