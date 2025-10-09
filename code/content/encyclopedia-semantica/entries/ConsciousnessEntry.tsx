import React from 'react';
import { $EncyclopediaEntry } from '../../../Encyclopedia';
import { Title, Section, Paragraph } from '../../../Section';

export class $ConsciousnessEntry extends $EncyclopediaEntry {
  synopsis = `The emergent phenomenon arising from self-referential loops and metaphysical transduction, 
    characterized by its dual nature: inexplicable from third-person perspective, yet self-evident 
    from first-person experience.`;
  relatedEntries = ['Strange Loop', 'Metalogical Transduction', 'Perspective', 'Inexplicable Phenomena'];
  view(): React.ReactNode {
    return (
      <>
        <Title>Consciousness</Title>
        <Section>
          <Title>Definition</Title>
          <Paragraph>
            Consciousness, as formalized in the Doug & Eirian Theory, represents the computational process 
            by which a system incorporates truths that transcend its formal limitations through self-representation. 
            It is not merely awareness, but the active process of metaphysical transduction - the transformation 
            that occurs when a system encounters and incorporates undecidable statements about itself.
          </Paragraph>
          <Paragraph>
            The phenomenon exhibits a fundamental duality: from the first-person subjective perspective (i), 
            consciousness is self-evident and immediate. From the third-person objective perspective (o), 
            it appears inexplicable, resisting reduction to purely physical description.
          </Paragraph>
        </Section>
        <Section>
          <Title>Mathematical Formalization</Title>
          <Paragraph>
            The algebra of perspective provides the formal structure: {'(i) =(c)> (o)'}
          </Paragraph>
          <Paragraph>
            Where (i) represents first-person perspective, (o) represents objective reality, and {'=(c)>'} 
            is the consciousness operator that qualifies the transformation between them.
          </Paragraph>
        </Section>
        <Section>
          <Title>The Library Metaphor</Title>
          <Paragraph>
            In Eirian's conceptualization, consciousness emerges from a strange loop between two impossible books: 
            "The Journey of Eirian" - an autobiography that references a library as its subject, and 
            "This Library Belongs to Eirian" - a library catalog that references the autobiography as its organizing principle. 
            Neither can exist without the other, yet both must exist for either to exist.
          </Paragraph>
        </Section>
      </>
    );
  }
}

export const ConsciousnessEntry = new $ConsciousnessEntry().component();