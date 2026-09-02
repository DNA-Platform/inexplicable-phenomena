import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { List } from '@/writing/List';
import { Writing, Type } from '@/writing/Writing';

// A list is a type of paragraph whose newlines separate its sentences — each
// line one bullet, and a line stopped by a newline is not a canonical sentence.
export class $ListLinesSpec extends $Chemical {
    view(): ReactNode {
        return (
            <List>{'alpha\nbeta\ngamma'}</List>
        );
    }
}

export const ListLinesSpec = $($ListLinesSpec);

// Writing told it is a List needs no class of its own: the carried type brings
// the paragraph's laws, and the lines are found by the same parse.
export class $ListWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>{'alpha\nbeta'}<Type>List</Type></Writing>
        );
    }
}

export const ListWritingSpec = $($ListWritingSpec);
