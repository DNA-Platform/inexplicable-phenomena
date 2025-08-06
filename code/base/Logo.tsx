import { Chemical } from '../chemistry';
import { Rose } from '../writing/interactive/Rose';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: inline-flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 1px;
  color: var(--primary-color, #2c3e50);
`;

const DNAText = styled.span`
  margin-left: 8px;
`;

export class Logo extends Chemical {
  rose: Rose;
  text: string = 'DNA';
  
  constructor() {
    super();
    this.rose = new Rose();
    this.rose.alignment = 'inline';
    this.rose.offsetY = '-2px';
    this.rose.container = this;
  }
  
  component(): React.ReactNode {
    return (
      <LogoContainer className="logo">
        {this.rose.component()}
        <DNAText>{this.text}</DNAText>
      </LogoContainer>
    );
  }
}