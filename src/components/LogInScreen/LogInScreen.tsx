import React from 'react';
import styled from 'styled-components';
import { Space } from '../Space/Space';

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]}rem;
  text-align: center;
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[3]}rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
`;

const FormWrapper = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: ${({ theme }) => theme.spaces[3]}em;
`;

const Background = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('/images/login_screen_bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

export const LogInScreen: React.FC = ({ children }) => (
  <Background>
    <Wrapper>
      <Logo>
        <i className="fas fa-cubes" />
      </Logo>
      <Space value={2} />
      <Name>Challenge App</Name>
      <Space value={8} />
      <FormWrapper>{children}</FormWrapper>
    </Wrapper>
  </Background>
);
