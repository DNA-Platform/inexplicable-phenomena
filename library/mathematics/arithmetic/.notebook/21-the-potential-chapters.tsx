import { Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The Potential Chapters ]]</Title>
        <Paragraph>
            Four chapters stood specified in the Textbook of Arithmetic on 12 November 2026 and retired to this
            note on my change of plans of 15 November: the textbook's chapters are titled by the things we
            attempt to specify, specifications of mathematical objects as the starting point. The four stand
            here as a potential four chapters for the textbook.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>Formal Logic — a formalization of logic that we will use in the Subject of Arithmetic.</Line>
            <Line>The Logical Form — an algebraic and categorical formalization of logic, in terms of identities and identification.</Line>
            <Line>Formal Arithmetic — a formalization of arithmetic that we will use in the Subject of Arithmetic.</Line>
            <Line>The Arithmetic Form — standing to Formal Arithmetic as The Logical Form stands to Formal Logic.</Line>
        </Paragraph>
        <Paragraph>
            Each opened with its specification and held the rest as the interpolation's placeholder. The material
            they cited stays in the notes: System L and System A of <Means>$[[ ./The System P ]]</Means>, and the
            first-order exposition <Means>$[[ ./System A ]]</Means>.
        </Paragraph>
    </Chapter>
);
