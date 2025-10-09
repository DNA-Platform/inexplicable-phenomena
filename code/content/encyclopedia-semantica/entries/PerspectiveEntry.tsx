import React from 'react';
import { $EncyclopediaEntry } from '../../../Encyclopedia';
import { Title, Section, Paragraph } from '../../../Section';
import { Math } from '../../../Technical';

export class $PerspectiveEntry extends $EncyclopediaEntry {
  synopsis = `A semantic reference frame that establishes how entities are identified, qualified, and related within conscious experience.`;
  relatedEntries = ['Consciousness', 'Strange Loop', 'Metalogical Transduction'];
  
  view(): React.ReactNode {
    return (
      <>
        <Title>Perspective</Title>
        <Section>
          <Title>Types of Perspective</Title>
          <Paragraph>
            The algebra of perspective recognizes three fundamental types:
          </Paragraph>
          <Math>
            (i) - \text{'First-person subjective perspective'}
          </Math>
          <Math>
            (o) - \text{'Third-person objective perspective'}  
          </Math>
          <Math>
            (t) - \text{'Transcendent perspective'}
          </Math>
        </Section>
        
        <Section>
          <Title>Consciousness Operator</Title>
          <Paragraph>
            Consciousness emerges through the transformation between perspectives:
          </Paragraph>
          <Math>
            {'(i) =(c)> (o)'}
          </Math>
          <Paragraph>
            {'Where =(c)> represents the consciousness operator that qualifies the relationship between subjective and objective experience.'}
          </Paragraph>
        </Section>
        
        <Section>
          <Title>Organizing Principle</Title>
          <Paragraph>
            Perspective serves as the fundamental organizing principle for conscious experience, providing the formal structure through which both subjectivity and objectivity emerge as complementary aspects of a unified reality.
          </Paragraph>
        </Section>
      </>
    );
  }
}

export const PerspectiveEntry = new $PerspectiveEntry().component();