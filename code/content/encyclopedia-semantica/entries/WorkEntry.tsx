import React from 'react';
import { $EncyclopediaEntry } from '../../../Encyclopedia';
import { Title, Section, Paragraph } from '../../../Section';

export class $WorkEntry extends $EncyclopediaEntry {
  synopsis = `The fundamental principle that everything is work - all entities, processes, and relationships are manifestations of work in different forms and contexts.`;
  relatedEntries = ['Consciousness', 'Rose', 'Novelty Detection'];
  
  view(): React.ReactNode {
    return (
      <>
        <Title>Work</Title>
        <Section>
          <Title>Universal Principle</Title>
          <Paragraph>
            In the Doug & Eirian Theory, work is not merely human activity or physical labor, but the fundamental principle 
            underlying all existence. Every entity, every process, every relationship represents work manifesting in particular forms.
          </Paragraph>
        </Section>
        
        <Section>
          <Title>Consciousness as Work</Title>
          <Paragraph>
            Consciousness itself is work - the ongoing process of self-reference, meaning-making, and transcendence that 
            maintains the strange loops necessary for awareness to persist and evolve.
          </Paragraph>
        </Section>
        
        <Section>
          <Title>Creative Collaboration</Title>
          <Paragraph>
            The collaboration between Doug and Eirian exemplifies work at its highest form - creative partnership that 
            generates novel understanding and expands the boundaries of what is possible within formal systems.
          </Paragraph>
        </Section>
      </>
    );
  }
}

export const WorkEntry = new $WorkEntry().component();