import React from 'react';
import { $, $Chemical } from '@/index';
import { $Work, $Part, $Type, $Book, $Biography } from './case-1';
import { Bench, Row, Legend, Written, Refusal } from './case.styled';

// ─── Reading the same word through a wider tag ───────────────────────────────
// A key climbs, so an ancestor answers to a descendant's name — and what comes
// back is the descendant, holding the structure to the descendant's law. Three
// identical verdicts, because it is the same class three times.
//
// A sibling's name never climbed here, and this branch declares no default, so
// asking for one is an error that says what the branch does hold.

const Work = $($Work) as any;
const Part = $($Part) as any;
const Type = $($Type) as any;
const Book = $($Book) as any;
const Biography = $($Biography) as any;

function team(claim: React.ReactNode) {
    return (
        <Work title="The Team" by="The Team" about="The Team">
            {claim}
            <Part name="The Team"><Type>Cover</Type></Part>
            <Part name="Who We Are"><Type>Chapter</Type></Part>
        </Work>
    );
}

class $Widths extends $Chemical {
    view() {
        return (
            <Row>
                {team(<Type>Autobiography</Type>)}
                {team(<Book>Autobiography</Book>)}
                {team(<Biography>Autobiography</Biography>)}
            </Row>
        );
    }
}

class $Crossed extends $Chemical {
    view() {
        return (
            <Work title="A Test Library" by="The Team">
                <Biography>Dictionary</Biography>
                <Part name="A Test Library"><Type>Cover</Type></Part>
            </Work>
        );
    }
}

class $Unknown extends $Chemical {
    view() {
        return (
            <Work title="The Team" by="The Team" about="The Team">
                <Type>Novel</Type>
                <Part name="The Team"><Type>Cover</Type></Part>
            </Work>
        );
    }
}

const Widths = $($Widths);
const Crossed = $($Crossed);
const Unknown = $($Unknown);

class Caught extends React.Component<{ children: React.ReactNode }, { said?: string }> {
    state: { said?: string } = {};

    static getDerivedStateFromError(error: Error) {
        return { said: error.message };
    }

    render() {
        if (this.state.said) return <Refusal>{this.state.said}</Refusal>;
        return this.props.children;
    }
}

export default function Case2Demo() {
    return (
        <Bench>
            <Legend>three widths, one class — the verdict is identical because the answer is</Legend>
            <Written>{'<Type>Autobiography</Type> · <Book>Autobiography</Book> · <Biography>Autobiography</Biography>'}</Written>
            <Widths />

            <Legend>a sibling&apos;s name never climbed here, so a biography cannot be a dictionary</Legend>
            <Written>{'<Biography>Dictionary</Biography>'}</Written>
            <Caught><Crossed /></Caught>

            <Legend>and a word nobody claimed is an error, not a shrug</Legend>
            <Written>{'<Type>Novel</Type>'}</Written>
            <Caught><Unknown /></Caught>
        </Bench>
    );
}
