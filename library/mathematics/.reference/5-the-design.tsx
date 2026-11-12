import { Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Books</Part>
        <Title>[[ The Design ]]</Title>
        <Paragraph>
            The design book holds the subject's visual decisions as sketches. The first
            is <Means>$[[ Subjective Design ]]( Mathematical Design )</Means>.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>A sketch is an HTML page beside its chapter, its forms lettered, each photographed at a desk's width and a phone's.</Line>
            <Line>A sketch is drawn in the pages' own palette and never with the print's class names; the decided form is cited by its number when it is built.</Line>
            <Line>A built design refers to the chapters that exemplify it.</Line>
        </Paragraph>
        <Paragraph>
            Held by hand; the photographs stand beside the chapter as its record.
        </Paragraph>
    </Chapter>
);
