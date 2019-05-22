import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';

import { applyElevationCss } from '../../styles/applyElevation';
import { transition } from '../../styles/transitions';

export interface ButtonProps {
  disabled?: boolean;
}

export const ButtonPrimary = styled.button<ButtonProps>`
  ${applyElevationCss(1)};
  ${transition};
  padding: ${themeGet('spaces.1')}em;
  font-size: ${themeGet('fontSizes.1')}em;
  width: 100%;
  background-color: ${themeGet('button.primary.bgColor')};
  color: ${themeGet('button.primary.color')};
  border-radius: ${themeGet('button.primary.borderRadius')}em;
  border: none;
  font-weight: ${themeGet('fontWeights.bold')};
  cursor: pointer;

  &:hover {
    ${applyElevationCss(2)};
    transform: translateY(-2px);
  }

  ${({ disabled }) =>
    !!disabled
      ? css`
          background-color: ${themeGet('button.primary.bgColorDisabled')};
          color: ${themeGet('button.primary.colorDisabled')};
        `
      : css``};
`;
