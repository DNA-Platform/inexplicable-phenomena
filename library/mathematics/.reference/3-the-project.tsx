import { Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Books</Part>
        <Title>[[ The Project ]]</Title>
        <Paragraph>
            The project is the record of the work: what each sprint accomplished and what it leaves. The project of
            the first subject is <Means>$[[ The Project of Arithmetic ]]( Arithmetic Project )</Means>.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>One entry per sprint, written at the close, in the form of the entries before it.</Line>
            <Line>An entry names what was built, refers into the notebook and the library where the work landed, and says what the sprint leaves.</Line>
            <Line>Each entry has its row on the project's table; the sprint's full record lives in the branch library, not here.</Line>
        </Paragraph>
        <Paragraph>
            Held by hand; the loop's prover walks every reference an entry makes.
        </Paragraph>
    </Chapter>
);
