// CREATED 2026-09-08 — Sprint 53 scaffold. The book's normal chapter, by the convention of ch20 Using the Public Library: subclass $Chapter, default-export its component, import as Chapter in every N-name.tsx.
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@dna-platform/public';

export class $AaronsonChapter extends $Chapter { }

export default $($AaronsonChapter);
