import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { AuthenticationContext } from '../../context/AuthenticationContext/AuthenticationContext';

const Logo = styled.div``;
const Logout = styled.div``;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${themeGet('menu.bgColor')};
  color: ${themeGet('menu.color')};
  font-weight: ${themeGet('fontWeights.bold')};
  font-size: ${themeGet('fontSizes.2')}em;
  padding: ${themeGet('spaces.1')}em;
`;

export const MenuContainer = () => {
  const { logout } = React.useContext(AuthenticationContext);

  return (
    <Wrapper>
      <Logo>
        <i className="fas fa-cubes" /> Challenge App
      </Logo>
      <Logout onClick={logout}>
        <i className="fas fa-sign-out-alt" />
      </Logout>
    </Wrapper>
  );
};
