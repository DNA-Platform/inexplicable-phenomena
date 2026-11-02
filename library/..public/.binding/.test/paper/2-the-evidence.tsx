import { Chapter, Equation, Heading, Math, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Title>[[ The Evidence ]]</Title>
        <Section>
            <Heading>[[[ What was found ]]]</Heading>
            <Paragraph>
                A chapter that is referred to from elsewhere and refers to nothing itself. Its title's url carries the
                fragment its element wears, so a reference to it has somewhere to land.
            </Paragraph>
            <Paragraph>
                What was found, written as the persona writes: an address is a function of the thing it names, so
                that <Math>{'a = f(t)'}</Math> holds for every reference in the library, and the equation of the
                claim is the one below, numbered by the paper.
            </Paragraph>
            <Equation>{'a = f(t), \\qquad t \\neq f^{-1}(a)'}</Equation>
        </Section>
        <Catchword />
    </Chapter>
);
