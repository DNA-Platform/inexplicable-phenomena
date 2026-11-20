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
            The specification of the Textbook of Arithmetic, 12 November 2026, amended 15 and 20 November.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>1. The textbook</Line>
            <Line>1.1 It holds the official results of arithmetic, stated and proved, and a result enters only as I have ruled it.</Line>
            <Line>1.2 Its official form is the algebraic one.</Line>
            <Line>1.3 Every chapter is titled by the thing it attempts to specify — a mathematical object as the starting point — and follows the entry (2).</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>2. The entry</Line>
            <Line>2.1 It opens with the specification of its object, the sovereign part.</Line>
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
            <Line>3.1 A chapter is an attempt to specify one mathematical object, and bears its title.</Line>
            <Line>3.2 The first object is named, 15 November: X, the symmetry of arithmetic, its chapter the textbook's first; further objects stand to be named, this item their placeholder, by 2.7.</Line>
            <Line>3.3 The potential four chapters of 12 November are retired to the subject's notes.</Line>
            <Line>3.4 The first chapter's specification of 15 November is retired to the subject's notes on 20 November, with the identification and the progress that stood beside it cleared, and the chapter starts fresh.</Line>
        </Paragraph>
    </Chapter>
);
