import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { List } from '@/writing/List';
import { Title } from '@/writing/Title';
import { TypeOfSection } from '@/writing/Section';
import { Writing, Type } from '@/writing/Writing';

// A list is a type of paragraph whose newlines separate its sentences — each
// line one bullet.
export class $ListLinesSpec extends $Chemical {
    view(): ReactNode {
        return (
            <List>{'alpha\nbeta\ngamma'}</List>
        );
    }
}

export const ListLinesSpec = $($ListLinesSpec);

// Writing told it is a List needs no class of its own: the carried type brings
// the paragraph laws, and the lines are found by the same parse.
export class $ListWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>{'alpha\nbeta'}<Type>List</Type></Writing>
        );
    }
}

export const ListWritingSpec = $($ListWritingSpec);

// A list inside a list contributes its lines to the outer list.
export class $ListNestedSpec extends $Chemical {
    view(): ReactNode {
        return (
            <List>
                {'one\ntwo\n'}
                <List>{'three\nfour'}</List>
            </List>
        );
    }
}

export const ListNestedSpec = $($ListNestedSpec);

// An arrangement has no level: typed as a section, the list composes paragraphs,
// its title among them.
export class $ListTypedSpec extends $Chemical {
    view(): ReactNode {
        return (
            <List>
                <TypeOfSection />
                <Title>
                    A list at section level
                </Title>
                {'Alpha beta.\n\nGamma delta.'}
            </List>
        );
    }
}

export const ListTypedSpec = $($ListTypedSpec);
