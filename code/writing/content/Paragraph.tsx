import { Writing } from '../Writing';
import { Rose } from '../interactive/Rose';
import { Author } from '../references/Author';
import styled from 'styled-components';

const ParagraphContainer = styled.div`
  position: relative;
  margin-bottom: 1em;
`;

const ParagraphText = styled.p<{ hasRose?: boolean }>`
  margin: 0;
  margin-left: ${props => props.hasRose ? '36px' : '0'};
  margin-right: ${props => props.hasRose ? '35px' : '0'};
  margin-bottom: 12px;
  font-size: 16px;
  font-family: 'Georgia', serif;
  line-height: 1.6;
  color: var(--text-color, #333);
  
  @media (max-width: 768px) {
    font-family: 'Roboto Mono', monospace;
    font-size: 15.5px;
    font-weight: 500;
  }
`;

export class Paragraph extends Writing {
  content: string = '';
  rose?: Rose;
  
  text(): string {
    return this.content;
  }
  
  addAppreciation(from?: Author): Rose {
    this.rose = new Rose();
    this.rose.alignment = 'right';
    this.rose.from = from;
    this.rose.offsetX = '20px';
    this.rose.offsetY = '0px';
    this.rose.container = this;
    return this.rose;
  }
  
  removeAppreciation(): void {
    this.rose = undefined;
  }
  
  component(): React.ReactNode {
    if (this.rose) {
      return (
        <ParagraphContainer>
          <ParagraphText hasRose={true}>
            {this.content}
          </ParagraphText>
          {this.rose.component()}
        </ParagraphContainer>
      );
    }
    
    return (
      <ParagraphText hasRose={false}>
        {this.content}
      </ParagraphText>
    );
  }
}