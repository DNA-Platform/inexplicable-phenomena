import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { List } from '@/writing/List';
import { Title } from '@/writing/Title';
import { TypeOfSection } from '@/writing/Section';
import { Writing, Type } from '@/writing/Writing';

// A list is a type of paragraph whose newlines separate its sentences — each
// line one bullet.
export class $ListLinesExample extends $Chemical {
    view(): ReactNode {
        return (
            <List>{'alpha\nbeta\ngamma'}</List>
        );
    }
}

export const ListLinesExample = $($ListLinesExample);

// Writing told it is a List needs no class of its own: the carried type brings
// the paragraph laws, and the lines are found by the same parse.
export class $ListWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>{'alpha\nbeta'}<Type>List</Type></Writing>
        );
    }
}

export const ListWritingExample = $($ListWritingExample);

// A list inside a list contributes its lines to the outer list.
export class $ListNestedExample extends $Chemical {
    view(): ReactNode {
        return (
            <List>
                {'one\ntwo\n'}
                <List>{'three\nfour'}</List>
            </List>
        );
    }
}

export const ListNestedExample = $($ListNestedExample);

// An arrangement has no level: typed as a section, the list composes paragraphs,
// its title among them.
export class $ListTypedExample extends $Chemical {
    view(): ReactNode {
        return (
            <List>
                <TypeOfSection />
                <Title>A list at section level</Title>
                {'Alpha beta.\n\nGamma delta.'}
            </List>
        );
    }
}

export const ListTypedExample = $($ListTypedExample);
