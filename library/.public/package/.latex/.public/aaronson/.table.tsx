// The contents, written as the chapters themselves. Each <Chapter> means the document that wears
// its title, and the anchor it draws reaches the heading that opens it.
import { $ } from '@dna-platform/chemistry';
import { Chapter, TableOfContents } from '@dna-platform/public';

export default $(
    <TableOfContents>
        <Chapter title="Introduction" />
        <Chapter title="Formalizing P = NP and Central Related Concepts" />
        <Chapter title="Beliefs About P = NP" />
        <Chapter title="Why Is Proving P ̸= NP Difficult?" />
        <Chapter title="Strengthenings of the P ̸= NP Conjecture" />
        <Chapter title="Progress" />
        <Chapter title="Conclusions" />
        <Chapter title="Acknowledgments" />
        <Chapter title="Appendix: Glossary of Complexity Classes" />
        <Chapter title="References" />
    </TableOfContents>,
    TableOfContents
);
