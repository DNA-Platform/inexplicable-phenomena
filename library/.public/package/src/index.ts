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
export * from './writing/Aside';
export * from './writing/Note';
export * from './writing/Math';
export * from './writing/Equation';
export * from './writing/Code';
export * from './writing/Quote';
export * from './writing/Heading';
export * from './writing/Image';
export * from './writing/Illustration';
export * from './writing/Figure';
export * from './writing/Phrase';
export * from './writing/Item';
export * from './writing/List';
export * from './writing/Cell';
export * from './writing/Table';
export * from './writing/Summary';
export * from './formatting/Theme';
export * from './formatting/Format';
export * from './formatting/TableFormat';
export * from './formatting/IllustrationFormat';

export * from './reference/Reference';
export * from './reference/Fold';
export * from './reference/Path';
export * from './reference/IndexCard';
export * from './reference/ReferenceCard';
export * from './reference/Catalogue';
export * from './reference/Ref';
export * from './reference/Citation';
export * from './reference/References';

export * from './library/Book';
export * from './library/Chapter';
export * from './library/Document';
export * from './library/Cover';
export * from './library/Synopsis';
export * from './library/Index';
export * from './library/Footer';
export * from './library/TableOfContents';
export * from './library/Title';
export * from './library/Author';
export * from './library/Subject';
export * from './library/CatalogueCard';
export * from './library/Bookmark';
export * from './library/Highlight';
export * from './library/PageFold';


// THE COMPOSITION ROOT, AND THE ONE PLACE DI HAPPENS. Every consumer reads the
// package here, so this runs after every module above has resolved and before
// anything is built. A kind that needs wiring declares `static $register()`;
// everything between the markers is EMITTED by register.ts before each build, so
// a kind cannot be added and silently left unwired. Do not edit it by hand.
// <registrations>
import { $Theme } from './formatting/Theme';
import { $Book } from './library/Book';
import { $Fold } from './reference/Fold';
import { $Reference } from './reference/Reference';
import { $Composition } from './writing/Composition';
import { $Type } from './writing/Type';

$Theme.$register();
$Book.$register();
$Fold.$register();
$Reference.$register();
$Composition.$register();
$Type.$register();
// </registrations>
