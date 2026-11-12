import { Chapter, Line, List, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis } from '../../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Parenthetical />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            The specification of the Textbook of Arithmetic, 12 November 2026.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>1. The textbook</Line>
            <Line>1.1 It holds the official results of arithmetic, stated and proved, and a result enters only as Doug has ruled it.</Line>
            <Line>1.2 Its official form is the algebraic one.</Line>
            <Line>1.3 Every chapter is about one formalism and follows the entry (2).</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>2. The entry</Line>
            <Line>2.1 It opens with the specification of its formalism, the sovereign part.</Line>
            <Line>2.2 It carries an explanation.</Line>
            <Line>2.3 It carries the formalism, annotated with justifications for how it satisfies the specification, citing items by number.</Line>
            <Line>2.4 It carries presentations in contexts, each context specified.</Line>
            <Line>2.5 It cites into the subject's library and the subject's notes.</Line>
            <Line>2.6 It shows one aspect at a time.</Line>
            <Line>2.7 Where something is specified and not yet built, a placeholder stands for it.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>3. The chapters</Line>
            <Line>3.1 Formal Logic, a formalization of logic that the Subject of Arithmetic will use.</Line>
            <Line>3.2 The Logical Form, an algebraic and categorical formalization of logic in terms of identities and identification.</Line>
            <Line>3.3 Formal Arithmetic, a formalization of arithmetic that the Subject of Arithmetic will use.</Line>
            <Line>3.4 The Arithmetic Form, the algebraic and categorical formalization of arithmetic in the same terms.</Line>
        </Paragraph>
    </Chapter>
);
