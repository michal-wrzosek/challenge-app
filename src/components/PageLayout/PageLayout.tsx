import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

const Wrapper = styled.div``;

const BG = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${themeGet('pageLayout.bgColor')};
  padding: ${themeGet('spaces.2')}em;
`;

export const PageLayout: React.FC = ({ children }) => (
  <BG>
    <Wrapper>{children}</Wrapper>
  </BG>
);
