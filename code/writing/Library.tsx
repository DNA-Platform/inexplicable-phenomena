import { Organization } from '../base/Organization';
import { Logo } from '../base/Logo';
import { Author } from './references/Author';
import styled from 'styled-components';

const LibraryContainer = styled.div`
  min-height: 100vh;
  background: var(--background-color, #fff);
`;

const LibraryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  background: var(--header-bg, #f8f9fa);
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px 20px;
    gap: 10px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const LibraryTitle = styled.h1`
  margin: 0;
  font-size: 1.8em;
  font-weight: 600;
  color: var(--primary-color, #2c3e50);
  font-family: 'Merriweather', serif;
`;

const CuratorInfo = styled.div`
  font-size: 14px;
  color: var(--text-color, #666);
  font-style: italic;
`;

const LibraryContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export class Library extends Organization {
  name?: string;
  curator?: Author;
  logo: Logo;
  
  constructor() {
    super();
    this.logo = new Logo();
  }
  
  component(): React.ReactNode {
    return (
      <LibraryContainer className="library">
        {this.renderHeader()}
        <LibraryContent className="library-content">
          {this.content()}
        </LibraryContent>
      </LibraryContainer>
    );
  }
  
  renderHeader(): React.ReactNode {
    return (
      <LibraryHeader>
        <HeaderLeft>
          {this.logo.component()}
          {this.name && <LibraryTitle>{this.name}</LibraryTitle>}
        </HeaderLeft>
        {this.curator && (
          <CuratorInfo>
            Curated by {this.curator.component()}
          </CuratorInfo>
        )}
      </LibraryHeader>
    );
  }
  
  content(): React.ReactNode {
    return super.content();
  }
}