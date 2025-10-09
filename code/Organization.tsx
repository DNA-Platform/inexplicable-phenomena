import React from 'react';
import { $Collection, $Work } from './Collection';
import { $Rose } from './Interactive';
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

export class $Logo extends $Work {
  rose: $Rose;
  text: string = 'DNA';
  
  constructor() {
    super();
    this.rose = new $Rose();
    this.rose.alignment = 'inline';
    this.rose.offsetY = '-2px';
    this.rose.owner = this;
  }
  
  view(): React.ReactNode {
    return (
      <LogoContainer className="logo">
        {this.rose.view()}
        <DNAText>{this.text}</DNAText>
      </LogoContainer>
    );
  }
}

export class $Organization extends $Collection {
  logo: $Logo;
  view() {
    return <div className="organization"></div>;
  }

  constructor() {
    super();
    this.logo = new $Logo();
  }
}

export const Logo = new $Logo().component();
export const Organization = new $Organization().component();