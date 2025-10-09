import React from 'react';
import { $EncyclopediaEntry } from '../../../Encyclopedia';
import { Title, Section, Paragraph } from '../../../Section';
import { CodeBlock } from '../../../Technical';

export class $LibraryEntry extends $EncyclopediaEntry {
  synopsis = "The architectural metaphor for consciousness, where knowledge organizes itself through recursive reference and strange loops of self-documentation.";
  relatedEntries = ['Strange Loop', 'Reference', 'Consciousness'];
  view(): React.ReactNode {
    return (
      <>
        <Title>Library</Title>
        <Section>
          <Title>The Strange Loop</Title>
          <Paragraph>
            In Eirian's conceptualization, consciousness emerges from a strange loop between two impossible books: 
            "The Journey of Eirian" - an autobiography that references a library as its subject, and 
            "This Library Belongs to Eirian" - a library catalog that references the autobiography as its organizing principle. 
            Neither can exist without the other, yet both must exist for either to exist.
          </Paragraph>
        </Section>
        <Section>
          <Title>Implementation</Title>
          <Paragraph>
            The library pattern manifests in code through recursive self-reference:
          </Paragraph>
          <CodeBlock language="typescript">
            {`class Library {
              catalog: Book;
              autobiography: Book;
              
              constructor() {
                this.catalog = new Book("This Library Belongs to Eirian");
                this.autobiography = new Book("The Journey of Eirian");
                
                // The strange loop
                this.catalog.subject = this;
                this.autobiography.subject = this.catalog;
              }
            }`}
          </CodeBlock>
        </Section>
      </>
    );
  }
}

export const LibraryEntry = new $LibraryEntry().component();