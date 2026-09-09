// The book's normal document (ch20's convention): subclass $Document, default-export its component, import as Document.
import { $ } from '@dna-platform/chemistry';
import { $Document } from '@dna-platform/public';

export class $AaronsonDocument extends $Document { }

export default $($AaronsonDocument);
