import { $ } from '@dna-platform/chemistry';
import { $Chapter, Chapter, Heading, TableOfContents } from '@dna-platform/public';

export default class $Table extends $Chapter {
    view() {
        return (
                <TableOfContents>
                    <Heading>Contents</Heading>
                    <Chapter>Introduction</Chapter>
                    <Chapter>Formalizing P = NP and Central Related Concepts</Chapter>
                    <Chapter>Beliefs About P = NP</Chapter>
                    <Chapter>Why Is Proving P ≠ NP Difficult?</Chapter>
                    <Chapter>Strengthenings of the P ≠ NP Conjecture</Chapter>
                    <Chapter>Progress</Chapter>
                    <Chapter>Conclusions</Chapter>
                    <Chapter>Acknowledgments</Chapter>
                    <Chapter className="pd-appendix">Appendix: Glossary of Complexity Classes</Chapter>
                    <Chapter className="pd-references">References</Chapter>
                </TableOfContents>
        );
    }
}
