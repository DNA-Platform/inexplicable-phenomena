export * from './utilities/Specification';
export * from './utilities/Reflection';
export * from './utilities/Parser';
export * from './utilities/Html';
export * from './utilities/Url';

export * from './writing/Writing';
export * from './writing/Annotation';
export * from './writing/Type';
export * from './writing/Composition';
export * from './writing/Letter';
export * from './writing/Word';
export * from './writing/Sentence';
export * from './writing/Paragraph';
export * from './writing/Section';
export * from './writing/Heading';
export * from './writing/Illustration';
export * from './writing/Phrase';
export * from './writing/List';
export * from './writing/Table';
export * from './writing/Summary';
export * from './writing/Theme';
export * from './writing/Format';

export * from './reference/Reference';
export * from './reference/Path';
export * from './reference/IndexCard';
export * from './reference/ReferenceCard';
export * from './reference/Catalogue';
export * from './reference/Ref';

export * from './book/Book';
export * from './book/Chapter';
export * from './book/Abstract';
export * from './book/Part';
export * from './book/Cover';
export * from './book/Synopsis';
export * from './book/Index';
export * from './book/Footer';
export * from './book/TableOfContents';
export * from './book/Title';
export * from './book/Author';
export * from './book/Subject';
export * from './book/CatalogueCard';
export * from './book/Bookmark';
export * from './book/Highlight';
export * from './book/PageFold';

export * from './encyclopedia';

// THE COMPOSITION ROOT, AND THE ONE PLACE DI HAPPENS. Every consumer reads the
// package here, so this runs after every module above has resolved and before
// anything is built. A kind that needs wiring declares `static $register()`;
// everything between the markers is EMITTED by register.ts before each build, so
// a kind cannot be added and silently left unwired. Do not edit it by hand.
// <registrations>
import { $Type } from './writing/Type';

$Type.$register();
// </registrations>
