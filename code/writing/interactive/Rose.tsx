import { Work } from '../../base/Work';
import { Author } from '../references/Author';
import styled from 'styled-components';

const RightAlignedRose = styled.img<{ offsetX: string; offsetY: string }>`
  position: absolute;
  top: calc(50% + ${(props) => props.offsetY});
  right: ${(props) => `calc(${props.offsetX} - 12.5px)`};
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: transform 0.4s ease-in-out;
  transform-origin: center;
  transform: translate(50%, -50%);

  &:hover {
    transform: translate(50%, -50%) scale(1.1);
  }
`;

const LeftAlignedRose = styled.img<{ offsetY: string; padding: string }>`
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
  margin-right: ${(props) => props.padding};
  margin-top: ${(props) => props.offsetY};
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const InlineRose = styled.img`
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  margin: 0 4px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2) rotate(10deg);
  }
`;

export class Rose extends Work {
  alignment: 'left' | 'right' | 'inline' = 'inline';
  target: string = 'https://dna.love';
  from?: Author;
  hovered: boolean = false;
  offsetX: string = '0px';
  offsetY: string = '0px';
  padding: string = '0px';
  
  getSrc(): string {
    return this.hovered
      ? '/images/icons/dna-rose-g1-fill-10-icon.png'
      : '/images/icons/dna-rose-g1-icon.png';
  }
  
  handleClick = (): void => {
    if (this.target.startsWith('http')) {
      window.open(this.target, '_blank');
    } else {
      window.location.href = this.target;
    }
  }
  
  handleMouseEnter = (): void => {
    this.hovered = true;
  }
  
  handleMouseLeave = (): void => {
    this.hovered = false;
  }
  
  component(): React.ReactNode {
    const commonProps = {
      src: this.getSrc(),
      alt: "DNA Rose - A symbol of love and consciousness",
      onClick: this.handleClick,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      title: this.from ? `Appreciated by ${this.from.displayName}` : "Show appreciation"
    };
    
    switch (this.alignment) {
      case 'right':
        return (
          <RightAlignedRose
            {...commonProps}
            offsetX={this.offsetX}
            offsetY={this.offsetY}
          />
        );
      
      case 'left':
        return (
          <LeftAlignedRose
            {...commonProps}
            offsetY={this.offsetY}
            padding={this.padding}
          />
        );
      
      default:
        return <InlineRose {...commonProps} />;
    }
  }
}