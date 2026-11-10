import { Chapter, Heading, Line, List, Means, Paragraph, Reference, Section, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Papers ]]( Sprint 125 )</Title>
        <Paragraph>
            The second sprint of arithmetic, opened on 10 November 2026 on Doug's word that the next step is a way to add
            papers to <Means>$[[ the library ]]( Mathematical Library )</Means> and to see whether the papers and
            resources themselves can stand in it, the first resource Gödel's paper on formally undecidable propositions;
            then that references good for the project are collected, the book for the library designed, and the library
            released as the site it was always meant to be.
        </Paragraph>
        <Section>
            <Heading>What the sprint does</Heading>
            <Paragraph>
                A paper is a citable publication held in the library as a resource: the file itself beside a chapter of
                The Library of Mathematics that describes it and carries its citation, which Doug writes, the paper
                signed by its author in itself and read on the page. The sprint sketches the paper's page and the
                library's table for his number, gives the binder a document type so a file beside a chapter is served
                by its address and never inlined, gives the package a Document figure that shows it, puts Gödel 1931 in
                English beside its chapter with both translations, has the notebook cite the chapter, and turns the
                site's publishing on, so that every push to the repository publishes the library.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The works the conversations cite</Heading>
            <Paragraph>
                Each work the notes and the six conversations name, with where its text is on the web and under what
                terms it stands, as found on 10 November 2026. A work in the public domain or at an open archive can
                be held beside a chapter; a work under copyright is cited by its address.
            </Paragraph>
            <Paragraph>
                <List />
                <Line>
                    <Word>
                        <Reference>https://www.w-k-essler.de/pdfs/goedel.pdf</Reference>
                        Gödel 1931, Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I
                    </Word>, Monatshefte für Mathematik und Physik 38, 173–198; a scan of the pages at Essler's site.
                    Public domain in the United States from 1 January 2027, in Austria from 2049; the English of
                    Hirzel, 2000, free with his notice, and of Meltzer, 1962, under copyright. The first resource.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.2307/2269028</Reference>
                        Rosser 1936, Extensions of some theorems of Gödel and Church
                    </Word>, Journal of Symbolic Logic 1, 87–91. Under copyright, at Cambridge.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.2307/2266895</Reference>
                        Löb 1955, Solution of a problem of Leon Henkin
                    </Word>, Journal of Symbolic Logic 20, 115–118. Under copyright, at Cambridge.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.2307/2964292</Reference>
                        Rogers 1958, Gödel numberings of partial recursive functions
                    </Word>, Journal of Symbolic Logic 23, 331–341. Under copyright, at Cambridge.
                </Line>
                <Line>
                    <Word>
                        <Reference>http://matwbn.icm.edu.pl/ksiazki/fm/fm49/fm4914.pdf</Reference>
                        Feferman 1960, Arithmetization of metamathematics in a general setting
                    </Word>, Fundamenta Mathematicae 49, 35–92. Free, the PDF at the Polish digital mathematics
                    library; the intensionality the notes lean on.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.2307/2964649</Reference>
                        Feferman 1962, Transfinite recursive progressions of axiomatic theories
                    </Word>, Journal of Symbolic Logic 27, 259–316. Under copyright, at Cambridge.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.1002/malq.19680140702</Reference>
                        Kreisel and Lévy 1968, Reflection principles and their use for establishing the complexity of
                        axiomatic systems
                    </Word>, Zeitschrift für mathematische Logik und Grundlagen der Mathematik 14, 97–142. Under
                    copyright, at Wiley.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.2307/2024634</Reference>
                        Kripke 1975, Outline of a Theory of Truth
                    </Word>, Journal of Philosophy 72, 690–716. Under copyright, at JSTOR; a course copy stands at
                    IMPAN's truth seminar.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.1007/978-94-015-7731-1</Reference>
                        Detlefsen 1986, Hilbert's Program: An Essay on Mathematical Instrumentalism
                    </Word>, Synthese Library 182, Reidel. Under copyright, at Springer.
                </Line>
                <Line>
                    Hofstadter 1979, Gödel, Escher, Bach, Basic Books, the formal system TNT of its chapters VIII and
                    IX. Under copyright; no address.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://www.impan.pl/get/doi/10.4064/aa-11-2-217-240</Reference>
                        Jurkat and Richert 1965, An improvement of Selberg's sieve method I
                    </Word>, Acta Arithmetica 11, 217–240. The record at IMPAN; whether the PDF is open there is not
                    verified.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://arxiv.org/abs/2405.09275</Reference>
                        Pakhomov, Rathjen and Rossegger 2025, Feferman's completeness theorem
                    </Word>, Bulletin of Symbolic Logic. Free, on arXiv.
                </Line>
                <Line>
                    Tarski 1935, Der Wahrheitsbegriff in den formalisierten Sprachen, Studia Philosophica 1, 261–405;
                    in English in Logic, Semantics, Metamathematics, 1956. Under copyright; named in the conversations
                    without a year.
                </Line>
                <Line>
                    Montague 1963, Syntactical treatments of modality, Acta Philosophica Fennica 16, 153–167. Under
                    copyright; no address.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.2307/2304666</Reference>
                        Gödel 1947, What is Cantor's continuum problem?
                    </Word>, American Mathematical Monthly 54, 515–525, the extrinsic justification. Under copyright,
                    at JSTOR.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://data.cerl.org/stcn/119813998</Reference>
                        Girard 1629, Invention nouvelle en l'algèbre
                    </Word>, Amsterdam, Blaeuw, the area of a spherical triangle. Public domain; no scan found
                    online, the record at the Short-Title Catalogue Netherlands and <Word>
                        <Reference>https://mathshistory.st-andrews.ac.uk/Strick/girard.pdf</Reference>
                        Strick's note at MacTutor
                    </Word>.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://www.archive.org/download/theoriederparall00stac/theoriederparall00stac.pdf</Reference>
                        Lambert 1786, Theorie der Parallellinien
                    </Word>, written 1766, in Engel and Stäckel 1895, Die Theorie der Parallellinien von Euklid bis
                    auf Gauss, 150–208. Public domain; the scan at the Internet Archive.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://fr.wikisource.org/wiki/Auteur:Jean-Victor_Poncelet</Reference>
                        Poncelet 1822, Traité des propriétés projectives des figures
                    </Word>, Paris, Bachelier. Public domain; the tomes at French Wikisource.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://www.deutsche-digitale-bibliothek.de/item/MQZMVOIGGGV6PZFABHMGW7ZFAUQR6QGF</Reference>
                        Beltrami 1868, Saggio di interpretazione della geometria non-euclidea
                    </Word>, Giornale di Matematiche 6, 284–312. Public domain; digitized at Göttingen, listed at the
                    Deutsche Digitale Bibliothek.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://www.gutenberg.org/ebooks/21016</Reference>
                        Dedekind 1872 and 1888, Stetigkeit und irrationale Zahlen, and Was sind und was sollen die
                        Zahlen?
                    </Word>, in Beman's English of 1901, Essays on the Theory of Numbers. Public domain; Project
                    Gutenberg.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://www.gutenberg.org/ebooks/17384</Reference>
                        Hilbert 1899, Grundlagen der Geometrie
                    </Word>, in Townsend's English of 1902, The Foundations of Geometry. Public domain; Project
                    Gutenberg; the second edition of 1903, with its appendices, <Word>
                        <Reference>https://arche.univ-lorraine.fr/pluginfile.php/4069329/mod_folder/content/0/Grundlagen%20der%20Geometrie.pdf</Reference>
                        scanned at Lorraine
                    </Word>.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.1090/S0002-9947-1901-1500557-5</Reference>
                        Hilbert 1901, Ueber Flächen von constanter Gaussscher Krümmung
                    </Word>, Transactions of the American Mathematical Society 2, 87–99, that no complete surface of
                    constant negative curvature stands in Euclidean space. Public domain; the AMS refused the fetch
                    from here; reprinted as Appendix V of the Grundlagen's second edition, in the scan above.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://gdz.sub.uni-goettingen.de/id/PPN235181684_0095</Reference>
                        Hilbert 1926, Über das Unendliche
                    </Word>, Mathematische Annalen 95, 161–190, the ideal elements. Public domain in the United
                    States; the volume digitized at Göttingen.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://gdz.sub.uni-goettingen.de/id/PPN235181684_0112</Reference>
                        Gentzen 1936, Die Widerspruchsfreiheit der reinen Zahlentheorie
                    </Word>, Mathematische Annalen 112, 493–565. Public domain in Europe since 2016, under copyright in
                    the United States until 2032; the volume digitized at Göttingen.
                </Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>References the team finds good for the project</Heading>
            <Paragraph>
                Chosen for a formalism of the notebook's The Options or a sentence of its The Subject of Logic that
                each bears on: the derivability conditions behind Löb, the provability logic that studies them, the
                algebraic descriptions of first-order logic that the semantics of logic in algebraic form would be
                measured against, and the metamathematics the paper's core is written in. None is downloaded this
                sprint; each is a chapter of Doug's when he picks it.
            </Paragraph>
            <Paragraph>
                <List />
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.1007/978-3-642-86896-2</Reference>
                        Hilbert and Bernays 1939, Grundlagen der Mathematik II
                    </Word>, Springer, second edition 1970; the derivability conditions a provability predicate must
                    satisfy, which the lifted predicate in PA and the identity's rule are measured against. Under
                    copyright.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.1007/978-1-4613-8601-8</Reference>
                        Smoryński 1985, Self-Reference and Modal Logic
                    </Word>, Springer; the provability logic GL in full, where the empty proof's rule would be read.
                    Under copyright.
                </Line>
                <Line>
                    <Word>
                        <Reference>https://doi.org/10.1017/CBO9780511625183</Reference>
                        Boolos 1993, The Logic of Provability
                    </Word>, Cambridge; the same logic from its semantics, and the fixed points. Under copyright.
                </Line>
                <Line>
                    Halmos 1962, Algebraic Logic, Chelsea; polyadic algebras, an algebraic description of first-order
                    logic, which the first order semantics the notes reach for would be compared with. Under copyright;
                    no address.
                </Line>
                <Line>
                    Henkin, Monk and Tarski 1971, Cylindric Algebras, Part I, North-Holland; the other algebraic
                    description of first-order logic, with an identity in its signature. Under copyright; no address.
                </Line>
                <Line>
                    Rasiowa and Sikorski 1963, The Mathematics of Metamathematics, PWN; Boolean algebras carrying
                    classical logic and its completeness, the model the algebra with an identity adjoined departs
                    from. Under copyright; no address.
                </Line>
                <Line>
                    Kleene 1952, Introduction to Metamathematics, North-Holland; the arithmetization and the first
                    theorem's proof in the form most of the century read, with the ω-consistency the notes weigh.
                    Under copyright; no address.
                </Line>
                <Line>
                    Gödel 1934, On undecidable propositions of formal mathematical systems, lectures at the Institute
                    for Advanced Study taken down by Kleene and Rosser, in Davis 1965, The Undecidable, Raven, Dover
                    2004; the general recursive functions and Gödel's own restatement. Under copyright; no address.
                </Line>
                <Line>
                    Franzén 2005, Gödel's Theorem: An Incomplete Guide to Its Use and Abuse, A K Peters; what the
                    theorems do not say, which a paper that reinterprets them must not say either. Under copyright; no
                    address.
                </Line>
                <Line>
                    Halbach 2014, Axiomatic Theories of Truth, Cambridge, second edition; the typed and untyped truth
                    predicates, where a truth value that is the absence of logic would be placed. Under copyright; no
                    address.
                </Line>
            </Paragraph>
        </Section>
    </Chapter>
);
