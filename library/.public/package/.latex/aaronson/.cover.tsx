// CREATED 2026-09-08 — Sprint 53 scaffold. OWED: the paper's real title, author and subject once Doug supplies the source; the abstract is the synopsis (.synopsis.tsx) — or an <Abstract>, which exists in book/ and is parenthetical by a copied default the register flags (book/Abstract.tsx:10).
import { $ } from '@dna-platform/chemistry';
import { Author, Cover, Reference, Subject, Title } from '@dna-platform/public';

export default $(
    <Cover>
        <Title>Is P Versus NP Formally Independent?<Reference>https://www.scottaaronson.com/papers/pnp.pdf</Reference></Title>
        <Author>Scott Aaronson</Author>
        <Subject>Computational complexity</Subject>
    </Cover>,
    Cover
);
