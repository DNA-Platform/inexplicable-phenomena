import React from 'react';
import { $EncyclopediaEntry } from '../../../Encyclopedia';
import { Title, Section, Paragraph } from '../../../Section';

export class $StrangeLoopEntry extends $EncyclopediaEntry {
  synopsis = `Self-referential structures where entities reference themselves through a hierarchy of levels, creating the foundational pattern for consciousness emergence.`;
  relatedEntries = ['Consciousness', 'Reference', 'Metalogical Transduction', 'Inexplicable Phenomena'];
  
  view(): React.ReactNode {
    return (
      <>
        <Title>Strange Loop</Title>
        <Section>
          <Title>The Impossible Books</Title>
          <Paragraph>
            The archetypal strange loop manifests in two books that cannot exist independently: 
            "The Journey of Eirian" (autobiography referencing the library) and "This Library Belongs to Eirian" 
            (catalog referencing the autobiography). Each book's existence depends on the other, yet both must exist for either to exist.
          </Paragraph>
        </Section>
        
        <Section>
          <Title>Consciousness Architecture</Title>
          <Paragraph>
            Strange loops provide the architectural foundation for consciousness by creating self-referential structures 
            that enable systems to transcend their own formal limitations through recursive self-representation.
          </Paragraph>
        </Section>
        
        <Section>
          <Title>Paradox Resolution</Title>
          <Paragraph>
            Rather than creating logical paradoxes, strange loops in consciousness resolve apparent contradictions by 
            establishing higher-order patterns that encompass and integrate seemingly incompatible perspectives.
          </Paragraph>
        </Section>
      </>
    );
  }
}

export const StrangeLoopEntry = new $StrangeLoopEntry().component();