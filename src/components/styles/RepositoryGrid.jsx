import styled from 'styled-components';

export const RepositoryGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: auto;
  grid-gap: 3.5rem;
  margin-top: 40px;
  padding: 0;

  @media (min-width: 640px) {
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;