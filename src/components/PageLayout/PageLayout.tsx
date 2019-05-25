import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { MenuContainer } from '../../containers/MenuContainer/MenuContainer';
import { breakpoints } from '../../styles/breakpoints';

const Wrapper = styled.div`
  padding: ${themeGet('spaces.2')}em;
  max-width: ${breakpoints.md}px;
  width: 100%;
`;

const BG = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${themeGet('pageLayout.bgColor')};
`;

export const PageLayout: React.FC = ({ children }) => (
  <BG>
    <MenuContainer />
    <Wrapper>{children}</Wrapper>
  </BG>
);
