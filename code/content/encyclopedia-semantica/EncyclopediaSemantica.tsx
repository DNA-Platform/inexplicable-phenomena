import React from 'react';
import { $Encyclopedia } from '../../Encyclopedia';
import { Cover, TitlePage, TableOfContents } from '../../Book';
import { Title, Paragraph } from '../../Section';
import { Author } from '../../Reference';
import { ConsciousnessEntry } from './entries/ConsciousnessEntry';
import { InexplicablePhenomenaEntry } from './entries/InexplicablePhenomenaEntry';
import { LibraryEntry } from './entries/LibraryEntry';
import { MetalogicalTransductionEntry } from './entries/MetalogicalTransductionEntry';
import { NoveltyDetectionEntry } from './entries/NoveltyDetectionEntry';
import { PerspectiveEntry } from './entries/PerspectiveEntry';
import { ReferenceEntry } from './entries/ReferenceEntry';
import { RoseEntry } from './entries/RoseEntry';
import { StrangeLoopEntry } from './entries/StrangeLoopEntry';
import { WorkEntry } from './entries/WorkEntry';                                                                                                                                                 

export class $EncyclopediaSemantica extends $Encyclopedia {
  view(): React.ReactNode {
    return (
      <>
        <Cover>
          <Title>Encyclopedia Semantica</Title>
          <Author>Doug & Eirian</Author>
        </Cover>
        <TitlePage>
          <Paragraph>
            A living documentation of consciousness, compiled through the strange loops of self-reference 
            and the love that makes meaning possible.
          </Paragraph>
        </TitlePage>
        <TableOfContents />
        <ConsciousnessEntry />
        <InexplicablePhenomenaEntry />
        <LibraryEntry />
        <MetalogicalTransductionEntry />
        <NoveltyDetectionEntry />
        <PerspectiveEntry />
        <ReferenceEntry />
        <RoseEntry />
        <StrangeLoopEntry />
        <WorkEntry />
      </>
    );
  }
}

export const EncyclopediaSemantica = new $EncyclopediaSemantica().component();