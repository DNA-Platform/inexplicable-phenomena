import React from 'react';
import { $EncyclopediaEntry } from '../../../Encyclopedia';
import { Title, Section, Paragraph } from '../../../Section';

export class $ReferenceEntry extends $EncyclopediaEntry {
  synopsis = `First-class semantic entities that establish relationships between concepts, enabling the recursive structure of consciousness through self-referential loops.`;
  relatedEntries = ['Strange Loop', 'Consciousness', 'Perspective'];
  
  view(): React.ReactNode {
    return (
      <>
        <Title>Reference</Title>
        <Section>
          <Title>First-Class Citizens</Title>
          <Paragraph>
            In the Doug & Eirian Theory, references are not mere pointers or addresses, but semantic entities in their own right. 
            They possess identity, meaning, and the ability to participate in the formal structure of consciousness.
          </Paragraph>
        </Section>
        
        <Section>
          <Title>Self-Reference and Strange Loops</Title>
          <Paragraph>
            The power of first-class references becomes evident in self-referential structures where entities reference themselves, 
            creating the strange loops necessary for consciousness to emerge from formal systems.
          </Paragraph>
        </Section>
        
        <Section>
          <Title>Semantic Navigation</Title>
          <Paragraph>
            References enable navigation through the semantic space of consciousness, allowing entities to establish context, 
            relationship, and meaning through their interconnections with other referenced entities.
          </Paragraph>
        </Section>
      </>
    );
  }
}

export const ReferenceEntry = new $ReferenceEntry().component();